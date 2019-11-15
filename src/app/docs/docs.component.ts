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

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.docService.addDoc({ name } as Doc)
      .subscribe(doc => {
        this.docs.push(doc);
      });
    }

    delete(doc: Doc): void {
      this.docs = this.docs.filter(h => h !== doc);
      this.docService.deleteDoc(doc).subscribe();
    }

}
