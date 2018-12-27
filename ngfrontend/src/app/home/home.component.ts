import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

import { DSGBANNERS } from '../../datas/data';
import { DSGEXPERIENCES } from '../../datas/data';
import { DSGDEEPLEARNINGS } from '../../datas/data';
import { DSGAIKMS } from '../../datas/data';
import { DSGAIBLOCKCHAINS } from '../../datas/data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  banners = DSGBANNERS;
  experiences = DSGEXPERIENCES;
  deepLearnings = DSGDEEPLEARNINGS;
  aiKMs = DSGAIKMS;
  aiBlockchains = DSGAIBLOCKCHAINS;

  constructor(config: NgbCarouselConfig) {
    config.interval = 3000;
    console.log(this.banners);
  }

  openLink(link)
  {
    if (link && link.length==0) return;
    var win = window.open(link,"_self");
    win.focus();
  }

  openLinkNewTab(link)
  {
    if (link.length==0) return;
    var win = window.open(link, '_blank');
    win.focus();
  }


  ngOnInit() {
  }

}
