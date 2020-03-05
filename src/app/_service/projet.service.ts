import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  constructor(private http: HttpClient) { }

  // recuperer la liste des modele (juste les modele !)
  getAllModeles() {
    return this.http.get<any>(`http://localhost:3000/projet/getAllProjet`);
  }
 
}