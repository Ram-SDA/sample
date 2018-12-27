import { Component, OnInit } from '@angular/core';
import {NgForm,FormBuilder, FormGroup} from '@angular/forms';

import {IassistService} from "../iassist.service";

@Component({
  selector: 'app-iassist',
  templateUrl: './iassist.component.html',
  styleUrls: ['./iassist.component.css']
})
export class IassistComponent implements OnInit {

  query = 'high temperature and not cough';
  nlpQuery = {};
  viewSymptoms = false;

  loading = false;

  expertData = [];

  constructor(private iassistService: IassistService) {

  }

  ngOnInit() {
  }

  getNLP():void {

    console.log('Getting NLP');
    this.loading = true;
    this.viewSymptoms = false;
    this.nlpQuery = {};
    this.expertData = [];
    this.iassistService.getNLP(this.query).subscribe(data => {
      console.dir(data);
      this.nlpQuery =data;

      if (!this.isEmptyObject(this.nlpQuery)) this.viewSymptoms =true;

          console.dir(this.nlpQuery);
      this.getExpertData();

    });
  }

  getExpertData():void {

    this.iassistService.getExpertData(this.nlpQuery).subscribe(data => {
      console.dir(data);
      this.expertData = data.diagnosis;
      this.loading = false;
    });
  }

  isEmptyObject(obj) {
    for(var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return true;
  }

}
