import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './config.service';
import {Pdup} from '../Pdup';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerService {
  constructor(private http: HttpClient, private SConfig: ConfigService) { }

  // recuperer la liste des modele (juste les modele !)
  getAllp() {
    return this.http.get<any>(`http://localhost:3000/per/getAllp`);
  }
  getAllpc() {
    
    return this.http.get<any>(`http://localhost:3000/cooge/getAllpc`);
  }

 
  addPerso(data){
    console.log("dataservice:",data)
    return this.http.post(`http://localhost:3000/personel/addPerso`,data)
    
  }
  
  supprimer(data) {
    
    return this.http.post(`http://localhost:3000/cooge/suppConge/`, data)
  }
  getAllperso() {
    return this.http.get<any>(`http://localhost:3000/personel/getAllPerso`);
  }
}
