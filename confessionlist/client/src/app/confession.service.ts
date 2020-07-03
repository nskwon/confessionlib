import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfessionService {
  private finaldata = [];
  private apiUrl = 'http://localhost:8080/api/confessions';
  serviceproperty = "Service Created";
  constructor(private http: HttpClient) { }
    /*
    private log(message: string) {
      this.confessionService.addConfession(`ConfessionService: ${message}`);
    }
    */
  

  //get all confessions
  getConfessionList(){
    return this.http.get(this.apiUrl)
  }

  showTodayDate() { 
    let ndate = new Date(); 
    return ndate; 
  }
/*
  //get confession by id
  getConfession(id: number): Observable<Confession> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Confession>(url).pipe(
      //tap(_ => this.log(`fetched confession id=${id}`)),
      catchError(this.handleError<Confession>(`getConfession id=${id}`))
    );
  }
  */
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
/*
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      //this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
*/
}
