import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers';
import { CongeComponent } from './conge/conge.component';
import { CraPersonnelComponent } from './craPersonnel/craPersonnel.component';
import { CraComponent } from './cra/cra.component';
import { Role } from './_models';
import { TousCongeComponent } from './tous-conge/tous-conge.component';
import { VisuliserMesCrasComponent } from './visuliser-mes-cras/visuliser-mes-cras.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  
  { path: 'Conge', component: CongeComponent, canActivate: [AuthGuard] },
  { path: 'viewMesCras', component: EmployeesComponent,data: { roles: [Role.Admin] }, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'cra', component: HomeComponent },
 
  { path: 'congesPersonnel', component: TousCongeComponent, data: { roles: [Role.Admin] }, canActivate: [AuthGuard] },
 
  { path: '**', redirectTo: '' },
  { path: '', component: CraComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouters { }
