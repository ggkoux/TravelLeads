import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Doc } from './doc';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const docs = [
        { id: 1, name: 'Invoice' },
        { id: 2, name: 'Itinerary' },
        { id: 3, name: 'Your Agent' },
        { id: 4, name: 'Feedback' },
        { id: 5, name: 'Flight Tickets' }
    ];
    return {docs};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(docs: Doc[]): number {
    return docs.length > 0 ? Math.max(...docs.map(doc => doc.id)) + 1 : 11;
  }
}
