import { Component, OnInit } from '@angular/core';
import {DupService} from '../_services/dup.service';
import {Pdup} from '../Pdup';

import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import {FormCongeComponent} from '../formConge/formConge.component';

import {MatDialog, MatTableDataSource,MatSort, MatPaginator} from '@angular/material';
import { CongeService } from '../_service/conge.service';
import { PerService } from '../_service/personnel.service';
import { personnel } from '../personnel';
import { AuthenticationService } from '../_services';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToasterService } from '../toaster.service';


export interface Numb {
  num: string;
}

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent  implements OnInit {
  user :personnel[];
  name:string;
  currentUser: User;
  c="";
  conges:MatTableDataSource<Pdup>;
  sort: MatSort;

  congeSelected:any[]=[];
  

  constructor(private authenticationService: AuthenticationService,private dupService: DupService, public dialog: MatDialog,
    public congeService: CongeService, public per:PerService,private router: Router,private toaster:ToasterService) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

      congeService.getAllConge().subscribe(data=>
      {
           
      
       for(let i of data){
    
          
        if(i.demandeur==this.currentUser.username)  {
 this.congeSelected.push(i);
        }
        }
  
        this.conges=new MatTableDataSource(this.congeSelected); 
   
  
          this.conges.sort=this.sort;
        }
    
  
    );



    
    per.getAllp().subscribe(user => {
     
      this.user=user;
      
    })
  }
  displayedColumns = ['etat','date_posted', 'dateDebut', 'dateFin', 'type', 'nbJours','delete'];
  dataSource = new PostDataSource(this.dupService);

  async ngOnInit() {
    await this.congeService.getSalarie({ data: this.currentUser.username }).toPromise();

       
  }
  async supprimer(id) {
   
    let j;
    for(j=0;j<this.congeSelected.length;j++){
if(id==this.congeSelected[j].id){
 
  this.toaster.show('success','La ligne est supprimée avec succée !');
  window.location.reload();
  await this.congeService.supprimer({ data:this.congeSelected[j]}.data).toPromise();
  this.dataSource.filter="";
  }
  }
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(FormCongeComponent, {
      width: '600px',
      data: 'Add Post'
    });
    dialogRef.componentInstance.event.subscribe((result) => {
     // this.dupService.addPost(result.data);
      this.dataSource = new PostDataSource(this.dupService);
    });
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
