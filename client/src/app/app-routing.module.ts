import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:"",
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path:'home', component: HomeComponent},
      {path:'update/:id', component: UpdateComponent},
  ]
  },
  {path:'**', component: LoginComponent, pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
