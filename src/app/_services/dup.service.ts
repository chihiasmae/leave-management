/*import {Injectable} from '@angular/core';
import {Pdup} from '../Pdup';
import {Observable, of} from 'rxjs';

@Injectable()
export class DupService {

  ELEMENT_DATA: Pdup[] = [
    {position: 0, title: 'Post One', category: 'Web Development', date_posted: new Date(), body: 'Body 1'},
    {position: 1, title: 'Post Two', category: 'Android Development', date_posted: new Date(), body: 'Body 2'},
    {position: 2, title: 'Post Three', category: 'IOS Development', date_posted: new Date(), body: 'Body 3'},
    {position: 3, title: 'Post Four', category: 'Android Development', date_posted: new Date(), body: 'Body 4'},
    {position: 4, title: 'Post Five', category: 'IOS Development', date_posted: new Date(), body: 'Body 5'},
    {position: 5, title: 'Post Six', category: 'Web Development', date_posted: new Date(), body: 'Body 6'},
  ];
  categories = [
    {value: 'Web-Development', viewValue: 'Web Development'},
    {value: 'Android-Development', viewValue: 'Android Development'},
    {value: 'IOS-Development', viewValue: 'IOS Development'}
  ];

  constructor() {
  }

  getData(): Observable<Pdup[]> {
    return of<Pdup[]>(this.ELEMENT_DATA);
  }

  getCategories() {
    return this.categories;
  }

  addPost(data) {
    this.ELEMENT_DATA.push(data);
  }

  deletePost(index) {
    this.ELEMENT_DATA = [...this.ELEMENT_DATA.slice(0, index), ...this.ELEMENT_DATA.slice(index + 1)];
  }

  dataLength() {
    return this.ELEMENT_DATA.length;
  }
}
*/


import { Injectable } from '@angular/core';
import {Pdup} from '../Pdup';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DupService {
ELEMENT_DATA: Pdup[];/* = [
    {position: 0, type: 'Web Development', date_posted: new Date(), body: 'Body 1', nbJours: null, dateDebut: null, dateFin: null, etat: 'en cours'},
    {position: 1,type: 'Android Development', date_posted: new Date(), body: 'Body 2',nbJours: null, dateDebut: null, dateFin: null, etat: 'en cours'},
    {position: 2, type: 'IOS Development', date_posted: new Date(), body: 'Body 3', nbJours: null, dateDebut: null, dateFin: null, etat: 'en cours'},
    {position: 3, type: 'Android Development', date_posted: new Date(), body: 'Body 4', nbJours: null, dateDebut: null, dateFin: null, etat: 'en cours'},
    {position: 4, type: 'IOS Development', date_posted: new Date(), body: 'Body 5', nbJours: null, dateDebut: null, dateFin: null, etat: 'en cours'},
    {position: 5, type: 'Web Development', date_posted: new Date(), body: 'Body 6',nbJours: null, dateDebut: null, dateFin: null, etat: 'en cours'},
  ];*/
  type = [
    
    {value: 'Congé non solde', viewValue: 'Congé non solde'},
    {value: 'Congé de maternité', viewValue: 'Congé de maternité'},
    {value: 'Congé annuel', viewValue: 'Congé annuel'},
    {value: 'Congé de maladie', viewValue: 'Congé de maladie'},
  
  ];
  typeE = [
    {value: 'Admin', viewValue: 'Admin'},
    {value: 'Non-Admin', viewValue: 'Non-Admin'}
  ];
   constructor() { }
 getDataconge(): Observable<Pdup[]> {
    return of<Pdup[]>(this.ELEMENT_DATA);
  }

  getType() {
    return this.type;
  }
  getTypee() {
    return this.typeE;
  }

  addPost(data) {
    this.ELEMENT_DATA.push(data);
  }

  deletePost(index) {
    this.ELEMENT_DATA = [...this.ELEMENT_DATA.slice(0, index), ...this.ELEMENT_DATA.slice(index + 1)];
  }

  dataLength() {
    return this.ELEMENT_DATA.length;
  }

}
