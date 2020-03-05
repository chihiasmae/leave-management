import { Component, OnInit } from '@angular/core';
import {DupService} from '../_services/dup.service';
import {Pdup} from '../Pdup';

import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import {FormCongeComponent} from '../formConge/formConge.component';

import {MatDialog, MatTableDataSource,MatSort, MatPaginator} from '@angular/material';
import {CongeService } from '../_service/conge.service';
import { PerService } from '../_service/personnel.service';
import { personnel } from '../personnel';
import { AuthenticationService } from '../_services';
import { User } from '../_models/user';
import { count } from 'rxjs/operators';
export interface Numb {
  num: string;
}

@Component({
  selector: 'app-tous-conge',
  templateUrl: './tous-conge.component.html',
  styleUrls: ['./tous-conge.component.css']
})
export class TousCongeComponent implements OnInit {
  user :personnel[];
  name:string;
  currentUser: User;

  conges:MatTableDataSource<Pdup>;
  sort: MatSort;
tousConge:any[]=[];
id;
  congeSelected:any[]=[];

  constructor(private authenticationService: AuthenticationService,private dupService: DupService, public dialog: MatDialog,
    public congeService: CongeService, public per:PerService) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    congeService.getAllConge().subscribe( conge => {
      
       this.conges=conge;
       console.log('conge',this.conges);
       for(let i of conge){
        this.tousConge.push(i);
       }
      }
    
    );








    
    per.getAllp().subscribe(user => {
     
      this.user=user;
      console.log('zzzzzzzzzzzzzzzzzzz:', user);
      console.log('hhh', this.user[0].PERSL_NAM);

    })
  }
  displayedColumns = ['etat','demandeur','date_posted', 'dateDebut', 'dateFin', 'type', 'nbJours', 'delete'];
  dataSource = new PostDataSource(this.dupService);

  ngOnInit() {
    for(let i of this.tousConge){
      this.id=i.id;}
  }
  
  async refuserPost(id) {
    
      let j;
      for(j=0;j<this.tousConge.length;j++){
if(id==this.conges[j].id){
 
this.conges[j].etat="Refusé";
//console.log('validerrrrrrr',{ data: this.conges[j]}.data);
await this.congeService.updateConge({ data: this.conges[j]}.data).toPromise();
      }
    }
   
}
  async validerPost(id) {

  let j;
  for(j=0;j<this.tousConge.length;j++){
if(id==this.conges[j].id){

this.conges[j].etat="Validé";
//console.log('validerrrrrrr',{ data: this.conges[j]}.data);
await this.congeService.updateConge({ data: this.conges[j]}.data).toPromise();
  }
}

}
  
  

}
export class PostDataSource extends DataSource<any> {
  paginator: MatPaginator;
  sort: MatSort;
  filter: string;
  constructor(private dupService: DupService) {
    super();
  }

  connect(): Observable<Pdup[]> {
    return this.dupService.getDataconge();
  }


  

  disconnect() {
  }
  
}

