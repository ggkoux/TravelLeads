import { Injectable } from '@angular/core';
import { Doc } from './doc';
import { Observable, of } from "rxjs";
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DocService {

  private docsUrl = 'api/docs';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getDocs(): Observable<Doc[]> {
    //Todo: send the message_after_fetching the docs
    return this.http.get<Doc[]>(this.docsUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Doc[]>('getDocs', []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Doc> {
    const url = `${this.docsUrl}/?id=${id}`;
    return this.http.get<Doc[]>(url)
      .pipe(
        map(docs => docs[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} doc id=${id}`);
        }),
        catchError(this.handleError<Doc>(`getDoc id=${id}`))
      );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  getDoc(id: number): Observable<Doc> {
    const url = `${this.docsUrl}/${id}`;
    return this.http.get<Doc>(url).pipe(
      tap(_ => this.log(`fetched doc id=${id}`)),
      catchError(this.handleError<Doc>(`getDoc id=${id}`))
    );
}


  /* GET heroes whose name contains search term */
  searchDocs(term: string): Observable<Doc[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Doc[]>(`${this.docsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found docs matching "${term}"`)),
      catchError(this.handleError<Doc[]>('searchDocs', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addDoc (doc: Doc): Observable<Doc> {
    return this.http.post<Doc>(this.docsUrl, doc, httpOptions).pipe(
      tap((newDoc: Doc) => this.log(`added doc w/ id=${newDoc.id}`)),
      catchError(this.handleError<Doc>('addDoc'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteDoc (doc: Doc | number): Observable<Doc> {
    const id = typeof doc === 'number' ? doc : doc.id;
    const url = `${this.docsUrl}/${id}`;

    return this.http.delete<Doc>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted doc id=${id}`)),
      catchError(this.handleError<Doc>('deleteDoc'))
    );
  }

  /** PUT: update the hero on the server */
  updateDoc (doc: Doc): Observable<any> {
    return this.http.put(this.docsUrl, doc, httpOptions).pipe(
      tap(_ => this.log(`updated doc id=${doc.id}`)),
      catchError(this.handleError<any>('updateDoc'))
    );
  }


    /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`DocService: ${message}`);
  }
}
