import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CraService {
  constructor(private http: HttpClient) { }
  getAllModeles() {
    return this.http.get<any>(`http://localhost:3000/cra/getAllCraa`);
  }
  getCragroup() {
    return this.http.get<any>(`http://localhost:3000/cra/group`);
  }
  getSalarie(data) {
    return this.http.post<any>(`http://localhost:3000/cra/getSalarier`,data);
  }
  getCraByName() {
    return this.http.get<any>(`http://localhost:3000/cra/getCrabyName`);
  }
  add(data) {
   // console.log('servisee', data)
    // const body = new HttpParams();
    // body.append('data', encodeURIComponent(JSON.stringify(data)));
    return this.http.post(`http://localhost:3000/cra/addCra/`, data)
  }
  supprimer(data) {
    // console.log('servisee', data)
     // const body = new HttpParams();
     // body.append('data', encodeURIComponent(JSON.stringify(data)));
     return this.http.post(`http://localhost:3000/cra/suppCra/`, data)
   }
  getAllDate() {
    return this.http.get<any>(`http://localhost:3000/cra/getAllDate`);
  }
  update(data) {
    // console.log('servisee', data)
     // const body = new HttpParams();
     // body.append('data', encodeURIComponent(JSON.stringify(data)));
     return this.http.post(`http://localhost:3000/cra/updateCra/`, data)
   }
   dup(data) {
    // console.log('servisee', data)
     // const body = new HttpParams();
     // body.append('data', encodeURIComponent(JSON.stringify(data)));
     return this.http.post(`http://localhost:3000/cra/dupliquer/`, data)
   }

   sendName(data) {
    // console.log('servisee', data)
     // const body = new HttpParams();
     // body.append('data', encodeURIComponent(JSON.stringify(data)));
     return this.http.post(`http://localhost:3000/cra/sendName/`, data)
   }
}
