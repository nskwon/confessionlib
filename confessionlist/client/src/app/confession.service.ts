import { Injectable } from '@angular/core';
import { Confession } from './confession';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ConfessionService {
  private confessionsUrl = '/api/confessions';
  constructor(private http: Http) { }

  // get("/api/confessions")
  getConfessions(): Promise<void | Confession[]> {
    return this.http.get(this.confessionsUrl)
               .toPromise()
               .then(response => response.json() as Confession[])
               .catch(this.handleError);
  }

  // post("/api/confessions")
  addConfession(newConfession: Confession): Promise<void | Confession> {
    return this.http.post(this.confessionsUrl, newConfession)
               .toPromise()
               .then(response => response.json() as Confession)
               .catch(this.handleError);
  }


  // delete("/api/confessions/:id")
  deleteConfession(delConfessionId: String): Promise<void | String> {
    return this.http.delete(this.confessionsUrl + '/' + delConfessionId)
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }
  
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}
