import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Confession } from './confession';
import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConfessionService {

  constructor(
    private http: HttpClient,
    private confessionService: ConfessionService) { }
    private confessionsUrl = 'api/confessions';
  /*
    private log(message: string) {
      this.confessionService.addConfession(`ConfessionService: ${message}`);
    }
    */
  

  //get all confessions
  getConfessions(): Observable<Confession[]>{
    return this.http.get<Confession[]>(this.confessionsUrl)
    .pipe(
      //tap(_ => this.log('fetched confessions')),
      catchError(this.handleError<Confession[]>('getConfessions', []))
    );
  }

  //get confession by id
  getConfession(id: number): Observable<Confession> {
    const url = `${this.confessionsUrl}/${id}`;
    return this.http.get<Confession>(url).pipe(
      //tap(_ => this.log(`fetched confession id=${id}`)),
      catchError(this.handleError<Confession>(`getConfession id=${id}`))
    );
  }
/*
  //add confession method
  addConfession(newConfession){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/confession', newConfession, {headers: HttpHeaders})
  }

  //delete confession method
  deleteConfession(id){
    return this.http.delete('http://localhost:8080/api/confession/'+id)
  }
  */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      //this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
