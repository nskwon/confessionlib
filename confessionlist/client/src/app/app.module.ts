import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ConfessionsComponent } from './confessions/confessions.component';
import { SubmitComponent } from './submit/submit.component';
import { ConfessionService } from './confession.service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfessionsComponent,
    AboutComponent,
    SubmitComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [ConfessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
