import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Confession} from './confessions/confession';
import 'rxjs/add/operator/map';



@Injectable({
  providedIn: 'root'
})
export class ConfessionService {

  constructor(private http: Http) { }

  //retrieving ConfessionService
  getConfessions(){
    return this.http.get('http://localhost:8080/api/confessions')
      .map(res => res.json());
  }

  //add confession method
  addConfession(newConfession){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/confession', newConfession, {headers:headers})
      .map(res => res.json());
  }

  //delete confession method
  deleteConfession(id){
    return this.http.delete('http://localhost:8080/api/confession/'+id)
  }
}
