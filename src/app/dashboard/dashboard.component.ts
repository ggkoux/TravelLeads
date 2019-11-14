import { Component, OnInit } from '@angular/core';
  import { Doc } from '../doc';
import { DocService } from '../doc.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  docs: Doc[] = [];

  constructor(private docService: DocService) { }

  ngOnInit() {
    this.getDocs();
  }

  getDocs(): void {
    this.docService.getDocs()
      .subscribe(docs => this.docs = docs.slice(1, 5));
  }
}
