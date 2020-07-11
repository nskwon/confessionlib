import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfessionService {
  private finaldata = [];
  constructor(private http: HttpClient) { }

  //get all confessions
  getConfessionList(){
    return this.http.get('http://localhost:8080/api/confessions')
  }

  //get specific confession
  getConfession(id){
    return this.http.get('http://localhost:8080/api/confession/'+id)
  }

  //update confession
  updateConfession(id){
    return this.http.get('http://localhost:8080/api/update/'+id)
  }

  //add confession
  addConfession(newConfession){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/confession', newConfession, {headers:headers})
  }

  //delete confession
  deleteConfession(id){
    return this.http.delete('http://localhost:8080/api/confession/'+id)
  }
  
}
