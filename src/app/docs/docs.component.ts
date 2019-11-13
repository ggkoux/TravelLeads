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

  selectedDoc: Doc;

  constructor(private docService: DocService) { }

  onSelect(doc: Doc): void {
    this.selectedDoc = doc;
  }

  getDocs(): void {
    this.docService.getDocs().subscribe(docs => this.docs = docs);
  }

  ngOnInit() {
    this.getDocs();
  }

}
