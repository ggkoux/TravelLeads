import { Component, OnInit, Input } from '@angular/core';
import { Doc } from '../doc';
import { DocService } from '../doc.service'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.css']
})
export class DocDetailComponent implements OnInit {

  @Input() doc: Doc;

  constructor(
    private route: ActivatedRoute,
    private docService: DocService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDoc();
  }

  goBack(): void {
  this.location.back();
}

  getDoc(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.docService.getDoc(id).subscribe(doc => this.doc = doc);
  }

  save(): void {
   this.docService.updateDoc(this.doc)
     .subscribe(() => this.goBack());
 }

}
