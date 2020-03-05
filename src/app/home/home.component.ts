
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
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
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
  constructor() { }

  ngOnInit() {
  }

}
