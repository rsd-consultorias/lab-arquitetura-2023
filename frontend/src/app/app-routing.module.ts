import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbrirContaComponent } from './abrir-conta/abrir-conta.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'abrir-conta', component: AbrirContaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
