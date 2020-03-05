// /*import {Injectable} from '@angular/core';
// import {Post} from '../Post';
// import {Observable, of} from 'rxjs';

// @Injectable()
// export class DataService {

//   ELEMENT_DATA: Post[] = [
//     {position: 0, title: 'Post One', category: 'Web Development', date_posted: new Date(), body: 'Body 1'},
//     {position: 1, title: 'Post Two', category: 'Android Development', date_posted: new Date(), body: 'Body 2'},
//     {position: 2, title: 'Post Three', category: 'IOS Development', date_posted: new Date(), body: 'Body 3'},
//     {position: 3, title: 'Post Four', category: 'Android Development', date_posted: new Date(), body: 'Body 4'},
//     {position: 4, title: 'Post Five', category: 'IOS Development', date_posted: new Date(), body: 'Body 5'},
//     {position: 5, title: 'Post Six', category: 'Web Development', date_posted: new Date(), body: 'Body 6'},
//   ];
//   categories = [
//     {value: 'Web-Development', viewValue: 'Web Development'},
//     {value: 'Android-Development', viewValue: 'Android Development'},
//     {value: 'IOS-Development', viewValue: 'IOS Development'}
//   ];

//   constructor() {
//   }

//   getData(): Observable<Post[]> {
//     return of<Post[]>(this.ELEMENT_DATA);
//   }

//   getCategories() {
//     return this.categories;
//   }

//   addPost(data) {
//     this.ELEMENT_DATA.push(data);
//   }

//   deletePost(index) {
//     this.ELEMENT_DATA = [...this.ELEMENT_DATA.slice(0, index), ...this.ELEMENT_DATA.slice(index + 1)];
//   }

//   dataLength() {
//     return this.ELEMENT_DATA.length;
//   }
// }*/


// import {Injectable} from '@angular/core';
// import {Post} from '../Post';
// import {Observable, of} from 'rxjs';

// @Injectable()
// export class DataService {

//   ELEMENT_DATA: Post[] = [
//     {position: 0, projet: 'Post One', Taction: 'Web Development', date: new Date(),commentaire : 'Body 1',fiche:'hhhhh',charge:0.5},

//   ];
//   categories = [
//     {value: 'Web-Development', viewValue: 'Web Development'},
//     {value: 'Android-Development', viewValue: 'Android Development'},
//     {value: 'IOS-Development', viewValue: 'IOS Development'}
//   ];
//    charge = [
// {value: 0.25, viewValue: 0.25},
// {value: 0.5, viewValue: 0.5},
// {value: 0.75, viewValue: 0.75},
// {value: 1, viewValue:1},

//   ];


//   constructor() {
//   }

//   getData(): Observable<Post[]> {
//     return of<Post[]>(this.ELEMENT_DATA);
//   }

//   getCategories() {
//     return this.categories;
//   }
//    getCharge() {
//     return this.charge;
//   }

//   addPost(data) {
//     this.ELEMENT_DATA.push(data);
//   }

//   deletePost(index) {
//     this.ELEMENT_DATA = [...this.ELEMENT_DATA.slice(0, index), ...this.ELEMENT_DATA.slice(index + 1)];
//   }

//   dataLength() {
//     return this.ELEMENT_DATA.length;
//   }
// }
