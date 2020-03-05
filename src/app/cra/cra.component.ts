import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { element } from 'protractor';
import { userInfo } from 'os';
import { MatTableDataSource } from '@angular/material';
import * as XLSX from 'xlsx';
import { CraService } from '../_service/cra.service';
import { Elem } from '../_models/cra';
import { TactionService } from '../_service/Taction.service';
import { ProjetService } from '../_service/projet.service';
import { jourService } from '../_service/jour.service';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { User } from '../_models';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ToasterService } from '../toaster.service';
export interface Numb {
  num: string;
}
@Component({
  selector: 'app-table',
  templateUrl: './cra.component.html',
  styleUrls: ['./cra.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CraComponent implements OnInit {
  dateString: string;
  day;
  month;
  year;
  showValidate: boolean=true;
  data: Elem[];
  craSelected: any[] = [];
  currentUser: User;
  nam: string;
  newes: Date;
date;

  myControl = new FormControl();
  options: Numb[] = [
    { num: '0.25' },
    { num: '0.5' },
    { num: '0.75' },
    { num: '1' },

  ];
  
  filteredOptions: Observable<Numb[]>;


  displayedColumns = ['date', 'projet', 'Taction', 'fiche', 'commentaire', 'charge', 'ex'];
   @ViewChild('TABLE', { static: false }) table: ElementRef;
  projets;
  action;
  cra;
  element: Elem;
  cras;
  dataSource
  listcharge: number[] = [1, 0.75, 0.5, 0.25];



  jours;
  joursF: any;
  GROUP: any;
  valider: boolean;
  constructor(public router: Router, private authenticationService: AuthenticationService, public projet: ProjetService, public taction: TactionService,
    public CraService: CraService, public jourservice: jourService, public app: AppComponent,private toaster:ToasterService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    projet.getAllModeles().subscribe(pro => {
      
      this.projets = pro;


    });

    this.dateString = ((new Date().getDay()) + 1).toString();

   

    this.nam = this.currentUser.username;


   


    this.jourservice.getAlljour().subscribe(jour => {
       
      this.jours = jour;
      this.joursF = this.jours;});



    CraService.getAllModeles().subscribe(pro => {
     
      this.cra = pro;

      for (let i of pro) {
        
        if (i.salarie == this.currentUser.username) {
          this.craSelected.push(i);
        }
      }






      this.cras = this.craSelected;

      this.data = []


      let j
      this.date=new Date();
      var month;
      var year;
      month=this.date.getMonth();
      year=this.date.getFullYear();
      this.newes = new Date(year, month, 1)
     
    
this.newes = new Date(this.newes.setDate(this.newes.getDate()));
             
var mm= new Date(year, month+1, 0)



 
      for (j = 0; this.newes.getDate()<mm.getDate(); j++) {
      
      
        var newdate1 = formatDate(this.newes, 'yyyy/MM/dd', 'en');
       
      
       
          let i;

          for (i = 0; i < this.joursF.length; i++) {
         
            var local = new Date(this.joursF[i].JOUR);
         local= new Date(local.setDate(local.getDate()-1));
           
            var local1 = formatDate(local, 'yyyy/MM/dd', 'en');
             newdate1 = formatDate(this.newes, 'yyyy/MM/dd', 'en');
             
            if (newdate1== local1) {
              
              this.newes = new Date(this.newes.setDate(this.newes.getDate()+1));
                         
            }
            

          }
       

         
        if ((this.newes.getDay() == 5)) {
          this.newes = new Date(this.newes.setDate(this.newes.getDate() + 1));
        }
        if ((this.newes.getDay() == 6)) {
          this.newes = new Date(this.newes.setDate(this.newes.getDate() + 1));
        }

        this.dateString=formatDate(this.newes, 'yyyy/MM/dd', 'en');


        var eleme: Elem = {
          id: null, position: j, projet: null, charge: null, Taction: null, date: this.newes, commentaire: null, fiche: null,
          salarie: this.nam, dateString: this.dateString
        }


        this.data.push(eleme);
       
        this.newes = new Date(this.newes.setDate(this.newes.getDate() + 1));
      }

    




      let n, m
      for (n = 0; n < this.cras.length; n++) {
        for (m = 0; m < this.data.length; m++) {
          if (this.cras[n].position == this.data[m].position) {
            this.data[m] = { id: this.cras[n].id, position: this.cras[n].position, projet: this.cras[n].projet, charge: this.cras[n].charge, Taction: this.cras[n].action, date: this.cras[n].date, commentaire: this.cras[n].commentaire, fiche: this.cra[n].fiche, salarie: this.cra[n].salarie, dateString: this.cra[n].dateString };


            this.data[m].id = this.cras[n].id;
            this.data[m].position = this.cras[n].position;
            this.data[m].projet = this.cras[n].projet.trim();
            this.data[m].charge = this.cras[n].charge;
            this.data[m].Taction = this.cras[n].action.trim();
            this.data[m].date = this.cras[n].date;
            this.data[m].fiche = this.cras[n].fiche.trim();
            this.data[m].salarie = this.cras[n].salarie;
            this.data[m].dateString = this.cras[n].dateString;



   

          }
        }

      }

       



      this.dataSource = new ExampleDataSource(this.data);
      
  
    });
    taction.getAllModeles().subscribe(tactio => {
      this.action = tactio;     


    })


  }
  async ngOnInit() {
    await this.CraService.getSalarie({ data: this.currentUser.username }).toPromise();
    this.onValider();

    
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.num),
        map(num => num ? this._filter(num) : this.options.slice())
      );





  }
  displayFn(numb?: Numb): string | undefined {
    return numb ? numb.num : undefined;
  }

  private _filter(name: string): Numb[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.num.toLowerCase().indexOf(filterValue) === 0);
  }




  
  craPost = {
    position: 0,
    date: null,
    fiche: null,
    commentaire: 0,
    action: '',
    projet: '',
    charge: 0,
    salarie: 'null',
  };

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  showw: boolean = false;
  expandedElement: any;
  positionAct;
  dupliquer = "+";
  async onSubmit() {
    this.showw = !this.showw;
   
  }
  async selectCraEmployee() {
    this.router.navigate(['/viewMesCras']);

    await this.CraService.sendName({ data: this.currentUser.username }).toPromise();


  }
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }

  weight;
  name;
  position;
  personnel: string;
  validerPost(position) {

   
  }
 
  async save(positionAct, user, id) {
    if (id == null) {


      let i;
      var charge: number = 0;
      for (i = 0; i < this.data.length; i++) {

        var date = formatDate(this.data[positionAct].date, 'yyyy/MM/dd', 'en');
        var otherdate = formatDate(this.data[i].date, 'yyyy/MM/dd', 'en');
        if (date == otherdate) {
          charge += this.data[i].charge;
        }
      };
      if (charge == 1 || charge < 1) {
        
        this.toaster.show('success','La ligne est bien ajoutée');
        
        await this.CraService.add({ data: this.dataSource.data[positionAct] }).toPromise();
        window.location.reload();
        
      }
      else if (charge > 1) {
        this.toaster.show('error','Vous avez dépassez la charge du jour !');
        
      }
    }



    if (id != null) {

      let i;
      var charge: number = 0;
      for (i = 0; i < this.data.length; i++) {

        var date = formatDate(this.data[positionAct].date, 'yyyy/MM/dd', 'en');
        var otherdate = formatDate(this.data[i].date, 'yyyy/MM/dd', 'en');
        if (date == otherdate) {
          charge += this.data[i].charge;
        }
      };
      if (charge == 1 || charge < 1) {
        await this.CraService.update({ data: this.dataSource.data[positionAct], user }).toPromise();
        this.toaster.show('success','La ligne est bien modifiée');
        window.location.reload();
      }
      else if (charge > 1) {
        this.toaster.show('error','Vous avez dépassez la charge du jour !');
       
      }

    }
  }


  




  async supprimer(id) {

    let j;
    for (j = 0; j < this.dataSource.data.length; j++) {
      if (id == this.data[j].id) {
        this.toaster.show('success','La ligne est supprimée avec succée !');
        window.location.reload();

        await this.CraService.supprimer({ data: this.data[j] }.data).toPromise();
        
       
        this.dataSource.filter = "";
        
      }
    }
  }




  
  async update(positionAct) {
    let i;
    var charge: number = 0;
    for (i = 0; i < this.data.length; i++) {

      var date = formatDate(this.data[positionAct].date, 'yyyy/MM/dd', 'en');
      var otherdate = formatDate(this.data[i].date, 'yyyy/MM/dd', 'en');
      if (date == otherdate) {
        charge += this.data[i].charge;
      }
    };
    if (charge == 1 || charge < 1) {
      
      await this.CraService.update({ data: this.dataSource.data[positionAct] }).toPromise();
     }
    else if (charge > 1) {
     
    }
   

  }
  
  async onadd(positionAct) {
    var charge2: number = 0;
    let ii
    for (ii = 0; ii < this.data.length; ii++) {
      var date = formatDate(this.data[positionAct].date, 'yyyy/MM/dd', 'en');
      var otherdate = formatDate(this.data[ii].date, 'yyyy/MM/dd', 'en');
      if (date == otherdate) {
        charge2 += this.data[ii].charge;
      }
    }
    if (charge2 >= 1) {
      this.toaster.show('error','Vous avez dépassez la charge du jour !');
    }
    else {
    
      var elem: Elem = {
        id: null,
        position: null, projet: null, charge: null, Taction: null, date: null, commentaire: null, fiche: null,
        salarie: null, dateString: null
      };
     

      elem.projet = this.data[positionAct].projet;
      elem.Taction = this.data[positionAct].Taction;
      elem.date = this.data[positionAct].date;
      elem.charge = this.data[positionAct].charge;
      elem.commentaire = this.data[positionAct].commentaire;

      elem.salarie = this.data[positionAct].salarie;
      elem.dateString = this.data[positionAct].dateString;


      elem.Taction = this.data[positionAct].Taction
      elem.fiche = this.data[positionAct].fiche
      elem.position = positionAct + 1;
      this.data.forEach(element => console.log("", element.projet, "-->", element.position));


      let i
      for (i = 0; i < this.data.length; i++) {

        if (this.data[i].position > positionAct) {

          this.data[i].position++;
        }

        else { }


      }

      await this.CraService.dup({ data: elem.position }).toPromise();
      this.data.push(elem);
      this.data.sort(function (a, b) {
        return a.position - b.position;
      })

      





      this.data.forEach(element => console.log("", element.projet, "-->", element.position));
      this.showw = !this.showw;


       this.dataSource.filter = "";
    }
  }

  onValider(){
    this.date=new Date();
      var month;
      var year;
      month=this.date.getMonth();
      year=this.date.getFullYear();
    var mm= new Date(year, month+1, 0)

    let i;
      let k=0;
    this.CraService.getCragroup().subscribe(cra=>{
      this.GROUP=cra;
     
    for(i=0;i<this.GROUP.length;i++)
    var datefinal = formatDate(mm, 'yyyy/MM/dd', 'en');
       if(this.GROUP[i].sum<1  ){
             k=k+1;
       }  });
       console.log('kkkkkkk',k)
       if(k>0){  
         this.showValidate=false;
       }
       if(k==0 ){
        this.showValidate=false;
       
       }   
      
       if(this.valider==true){
       alert("votre CRA de ce mois est valide " )
       }
       if(this.valider==false){
        alert("votre CRA de ce mois n'est pas valide ")
        }
  }


}






export class ExampleDataSource extends MatTableDataSource<any>{



}