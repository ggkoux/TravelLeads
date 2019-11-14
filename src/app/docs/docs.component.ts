import { Component, OnInit } from '@angular/core';
import { Doc } from '../doc';
import { DocService } from '../doc.service';


@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {

  docs: Doc[];


  constructor(private docService: DocService) { }


  getDocs(): void {
    this.docService.getDocs().subscribe(docs => this.docs = docs);
  }

  ngOnInit() {
    this.getDocs();
  }

}
