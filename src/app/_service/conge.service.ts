import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  constructor(private http: HttpClient) { }
  getSalarie(data) {
    return this.http.post<any>(`http://localhost:3000/conge/getSalarier`,data);
  }
  getSum() {
    return this.http.get<any>(`http://localhost:3000/conge/getAllSum`);
  }

  // recuperer la liste des modele (juste les modele !)
  getAllConge() {
    return this.http.get<any>(`http://localhost:3000/conge/getAllConge`);
  }
  ajouter(data) {
    console.log('servisee', data)
    
    return this.http.post(`http://localhost:3000/conge/addConge/`, data)
  }
  updateConge(data) {
    
    return this.http.post(`http://localhost:3000/conge/updateConge/`, data)
  }
  supprimer(data) {
    
    return this.http.post(`http://localhost:3000/conge/suppConge/`, data)
  }
}
