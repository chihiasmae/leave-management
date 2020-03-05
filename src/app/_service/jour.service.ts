import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import {Pdup} from '../Pdup';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class jourService {
  constructor(private http: HttpClient, private SConfig: ConfigService) { }

  // recuperer la liste des modele (juste les modele !)
  getAlljour() {
    return this.http.get<any>(`http://localhost:3000/jour/getAlljour`);
  }
  
}
