import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfessionsComponent } from './confessions/confessions.component';
import { AboutComponent } from './about/about.component';
import { SubmitComponent } from './submit/submit.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '',  redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent },
  { path: 'confessions', component: ConfessionsComponent },
  { path: 'submit', component: SubmitComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
