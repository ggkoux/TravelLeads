import { Injectable } from '@angular/core';
import { Doc } from './doc';
import { DOCS } from './mock-docs';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocService {

  getDocs(): Observable<Doc[]> {
    return of(DOCS);
  }


  constructor() { }
}
