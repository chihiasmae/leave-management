import { Component, OnInit } from '@angular/core';
import { EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, DateAdapter } from '@angular/material';
import { DupService } from '../_services/dup.service';
import { FormControl } from '@angular/forms';
import { PerService } from 'src/app/_service/personnel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models';
import { AuthenticationService } from '../_services';
import { AppComponent } from '../app.component';
import { jourService } from '../_service/jour.service';
import { formatDate } from '@angular/common';
import { ToasterService } from '../toaster.service';
@Component({
  selector: 'app-form-employe',
  templateUrl: './form-employe.component.html',
  styleUrls: ['./form-employe.component.css']
})
export class FormEmployeComponent implements OnInit {
  currentUser: User;
  nam: string;
  blogPost = {
    demandeur: null,
    dateDebut: null,
    dateFin: null,
    nbJours: 0,
    type: '',
    date_posted: new Date(),
    etat: null,
    email:null,
    ville:null,
fonction:null,
    body:null,
    motDePass:null,
    position: 0,
  };
  public event: EventEmitter<any> = new EventEmitter();
  somme;
  sum: any[] = [];
  jours;
  joursF;
  datePremier;
  dateDernier;
  dates: any[] = [];
  datePremier1;
  dateDernier1;
  week = 0;
  
  

  dateDebut = new FormControl(new Date());
  dateFin = new FormControl(new Date());
  week1=0;
  constructor(private authenticationService: AuthenticationService,private toaster:ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<FormEmployeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dupService: DupService, public service: PerService, public jourservice: jourService,private dateAdapter:DateAdapter<any>,
  ) {
    this.dateAdapter.setLocale('fr');
    // this.service.getSum().subscribe(jours => {
    //   this.somme = jours;
    //   for (let i of jours) {
    //     this.sum.push(i);
    //   }
    // });

  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    
    this.nam = this.currentUser.PERSL_NAM;
    this.blogPost.demandeur = this.currentUser.username;
    
    dateDebut: new FormControl(new Date());
    dateFin: new FormControl(new Date());
    this.getname();
   
    this.jourservice.getAlljour().subscribe(jour => {

      this.jours = jour;
      this.joursF = this.jours
     
     

    })


  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSubmit() {

    
//console.log("employe",this.blogPost)

      await this.service.addPerso({ data: this.blogPost }).toPromise();
     
      this.dialogRef.close();
      window.location.reload();


  
    

      let i = 0;
      let add = 0;


      for (i = 0; i < this.sum.length; i++) {
        add =add+ this.sum[i].nbrJours;

      }
     
      
      add = add + this.blogPost.nbJours;
     
      if (add > 19) {
        this.toaster.show('error','Vous avez dépassez le nombre autorisé pour votre congé !');
      }
      if (add == 19) {
        this.toaster.show('error','Vous avez dépassez le nombre autorisé pour votre congé !');
      }
      if (add < 19) {

        await this.service.addPerso({ data: this.blogPost }).toPromise();
        this.toaster.show('success','La demande est bien ajoutée');
        this.dialogRef.close();
        window.location.reload();

      }
      this.router.navigateByUrl('/dup');

    
  }

  nbb: string = "";

  type = this.dupService.getTypee();

 
  
  myFunction() {
   


this.blogPost.nbJours=0;
   this.week1=0;
  var dates1: any[] = [];
  var  dated = new Date(this.blogPost.dateDebut);
 var datef = new Date(this.blogPost.dateFin);
  dated = new Date(dated.setDate(dated.getDate() - 1));
  var dated1 = formatDate(dated, 'yyyy/MM/dd', 'en');
  var datef1 = formatDate(datef, 'yyyy/MM/dd', 'en');
  while (dated1 < datef1) {
    dates1.push(dated);
    dated = new Date(dated.setDate(dated.getDate() + 1));
    dated1 = formatDate(dated, 'yyyy/MM/dd', 'en');

  }

  

  let j = 0;
  for (j = 0; j < dates1.length; j++) {
    if (dates1[j].getDay() == 6) {
      this.week1++;
    }
    if (dates1[j].getDay() == 0) {
      this.week1++;
    }
    let k;
    for (k = 0; k < this.joursF.length; k++) {
      var local = new Date(this.joursF[k].JOUR);
      var local1 = formatDate(local, 'yyyy/MM/dd', 'en');
      var deb = new Date(dates1[j]);
      var deb1 = formatDate(deb, 'yyyy/MM/dd', 'en');
      if (deb1 == local1) {
        this.week1++;
      }
    }
   
  }

 var blogDateFin=new Date(this.blogPost.dateFin);
 var blogDateDebut=new Date(this.blogPost.dateDebut);
    let diff: number = blogDateFin.getTime() - blogDateDebut.getTime();

    let res: number = (diff / (1000 * 60 * 60 * 24));

    if (res > 0) {

res=res+1;
res=res-this.week1;
     
      this.blogPost.nbJours=res;
      this.nbb = "";
     
      
    }
  if(res < 1) {
      this.nbb = "Entrez une autre date";

      this.blogPost.nbJours = 0;
      
    }
   
  }
  getname() {

    return this.currentUser
  }


}
