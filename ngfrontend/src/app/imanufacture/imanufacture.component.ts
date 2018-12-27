import { Component, OnInit } from '@angular/core';
import {NgForm,FormBuilder, FormGroup} from '@angular/forms';

import {ImanufactureService} from "../imanufacture.service";

@Component({
  selector: 'app-imanufacture',
  templateUrl: './imanufacture.component.html',
  styleUrls: ['./imanufacture.component.css']
})
export class ImanufactureComponent implements OnInit {

  query = 'ring wheel damage mark';
  nlpQuery = {};
  viewSymptoms = false;

  loading = false;

  expertData = [];

  constructor(private imanufactureService: ImanufactureService) {

  }

  ngOnInit() {
  }

  getNLP():void {
    this.loading = true;
    this.viewSymptoms = false;
    this.nlpQuery = {};
    this.expertData = [];
    this.imanufactureService.getNLP(this.query).subscribe(data => {
      console.dir(data);
      this.nlpQuery =data;
      if (!this.isEmptyObject(this.nlpQuery)) this.viewSymptoms =true;
      console.dir(this.nlpQuery);
      this.getExpertData();

    });
  }

  getExpertData():void {

    this.imanufactureService.getExpertData(this.nlpQuery).subscribe(data => {
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
