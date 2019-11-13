import { Component, OnInit, Input } from '@angular/core';
import { Doc } from '../doc';

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.css']
})
export class DocDetailComponent implements OnInit {

  @Input() doc: Doc;

  constructor() { }

  ngOnInit() {
  }

}
