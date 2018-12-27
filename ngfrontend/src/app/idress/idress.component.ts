import { Component, OnInit } from '@angular/core';

import { DSGAIMODELS } from '../../datas/data';
import { DSGAIDRESS } from '../../datas/data';
import { DSGAIFINALDRESS } from '../../datas/data';

import * as $ from 'jquery';

@Component({
  selector: 'app-idress',
  templateUrl: './idress.component.html',
  styleUrls: ['./idress.component.css']
})
export class IdressComponent implements OnInit {

  models = DSGAIMODELS;
  clothes = DSGAIDRESS;
  finalDresses = DSGAIFINALDRESS;

  modelTag = 'm1';
  clothTag = 'c1';

  aiGenImage = 'assets/images/finaldress/imgHldBlank.jpg';

  constructor() {
    //this.callAIGen();

  }

  ngOnInit() {

    // $('.staticCarousel').carousel({
    //   interval: false
    // });
  }

  selectModel(tag) {
    this.modelTag = tag;
    this.callAIGen();
  }

  selectCloth(tag) {
    this.clothTag = tag;
    this.callAIGen();
  }

  callAIGen() {

    let newTag = this.modelTag + this.clothTag;

    for (let item of this.finalDresses) {

      if (item.tag == newTag )
      {
        this.aiGenImage = item.img;
      }

    }

  }


}
