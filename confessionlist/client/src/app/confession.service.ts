import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfessionService {
  private finaldata = [];
  private apiUrl = 'http://localhost:8080/api/confessions';
  serviceproperty = "Service Created";
  constructor(private http: HttpClient) { }

  //get all confessions
  getConfessionList(){
    return this.http.get(this.apiUrl)
  }

  addConfession(newConfession){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/confessionsapi/confession', newConfession, {headers:headers});
  }

  showTodayDate() { 
    let ndate = new Date(); 
    return ndate; 
  }
}
