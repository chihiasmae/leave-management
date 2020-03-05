import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { PerService } from './_service/personnel.service';
import { User, Role } from './_models';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
    users: User[];
    constructor(public per: PerService,
    ) {
        per.getAllp().subscribe(user => {

            this.users = user;

            for (let i in this.users) {
                this.users[i].username = this.users[i].PERSL_NAM;
                if (this.users[i].PERSL_ADMIN == -1) {
                    this.users[i].role = "Admin";
                }


            }
        })


    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role = roleString ? Role[roleString] : null;
        return of(null).pipe(mergeMap(() => {
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                const user = this.users.find(x => x.PERSL_NAM === request.body.username && x.PERSL_PSW === request.body.password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.PERSL_CLE,
                    username: user.PERSL_NAM,
                    password: user.PERSL_PSW,
                    role: user.role,
                    token: `fake-jwt-token.${user.role}`
                });
            }
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                if (!isLoggedIn) return unauthorised();
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);
                const currentUser = this.users.find(x => x.role === role);
                if (id !== currentUser.PERSL_CLE && role !== Role.Admin) return unauthorised();

                const user = this.users.find(x => x.PERSL_CLE === id);
                return ok(user);
            }
            if (request.url.endsWith('/users') && request.method === 'GET') {
                if (role !== Role.Admin) return unauthorised();
                return ok(this.users);
            }

            return next.handle(request);
        }))
            .pipe(materialize()) 
            .pipe(delay(500))
            .pipe(dematerialize());
        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }

    }
}

export let BackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: BackendInterceptor,
    multi: true
};