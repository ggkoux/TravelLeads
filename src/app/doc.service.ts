import { Injectable } from '@angular/core';
import { Doc } from './doc';
import { DOCS } from './mock-docs';
import { Observable, of } from "rxjs";
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  getDocs(): Observable<Doc[]> {
    //Todo: send the message_after_fetching the docs
    this.messageService.add('DocService: fetched docs');
    return of(DOCS);
  }


  constructor(private messageService: MessageService) { }
}
