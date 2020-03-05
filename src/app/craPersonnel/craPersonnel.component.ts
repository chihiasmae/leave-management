
import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import {  MatSort, MatTableDataSource } from '@angular/material';
import * as XLSX from 'xlsx';
import { CraService } from '../_service/cra.service';
export interface SearchItem {
  charge: number;
  projet: string;
  date: string;
  Taction: string;
  fiche: string;
  salarie: string;
}

@Component({
  selector: 'app-craPersonnel',
  templateUrl: './craPersonnel.component.html',
  styleUrls: ['./craPersonnel.component.css']
})
export class CraPersonnelComponent implements OnInit {

  displayedColumns = ['date', 'salarie','projet', 'Taction', 'fiche', 'commentaire', 'charge'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild('TABLE', { static: false }) table: ElementRef;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }
  ngOnInit() {


  }



  cras
  constructor(public CraService: CraService) {

    CraService.getAllModeles().subscribe(pro => {
      this.cras = pro;
      this.dataSource = new MatTableDataSource(this.cras);



    })



  }

  
  ngAfterViewInit() {
   
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}



export interface UserData {
  id: string;
  projet: string;
  fiche: string;
  date: string;
  Taction: string;
  commentaire: string;
  charge: string;
  salarie: string;
}
