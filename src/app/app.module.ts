import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CongeComponent } from './conge/conge.component';
import { HotTableModule } from '@handsontable/angular';
import { AppRouters } from './app.routes';
import { DupService } from './_services/dup.service';
import { FormCongeComponent } from './formConge/formConge.component';
import { FormEmployeComponent } from './form-Employe/form-Employe.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

import { TableModule } from 'ngx-easy-table';
import { CraComponent } from './cra/cra.component';
import { TousCongeComponent } from './tous-conge/tous-conge.component';
import { VisuliserMesCrasComponent } from './visuliser-mes-cras/visuliser-mes-cras.component';
import { ToasterContainerComponent } from './toaster-container.component';
import { ToasterComponent } from './toaster.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    CongeComponent,
    FormEmployeComponent,
    LoginComponent,

    CraComponent,
    TousCongeComponent,
    VisuliserMesCrasComponent,
    ToasterContainerComponent,
    ToasterComponent,
    FormCongeComponent,
    EmployeesComponent,
    HomeComponent,
  ],
  entryComponents: [
    FormCongeComponent,
    FormEmployeComponent

  ],
  imports: [
    PerfectScrollbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRouters,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    HotTableModule.forRoot()

  ],
  providers: [DupService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
   
    },
    BackendProvider, AppComponent],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
