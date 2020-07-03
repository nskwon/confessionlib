import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfessionsComponent } from './confessions/confessions.component';
import { ConfessionService } from './confession.service';


@NgModule({
  declarations: [
    AppComponent,
    ConfessionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ConfessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
