import { Component, Input, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import {NgForm,FormBuilder, FormGroup} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { Chart } from 'chart.js';
import { ScmService } from '../scm.service'

import { Scm } from '../scm';
import { ScmCounterMain } from '../scm';



@Component({
  selector: 'app-scm',
  templateUrl: './scm.component.html',
  styleUrls: ['./scm.component.css']
})
export class ScmComponent implements OnInit {

  viewInit = false;
  dsChart1 = [];
  dsChart2 = [];

  selectedRows = [];

  pagination = {
    total:0,
    page:1
  }

  scmDisplayType = 'On Time';
  scmType = 'onTime';
  scmData : Scm[];
  scmMetrics : ScmCounterMain;

  constructor(private elementRef: ElementRef,private _notifications: NotificationsService, private scmService: ScmService) {

  }

  drawGraph() {
    let myCtx1 = this.elementRef.nativeElement.querySelector("#dsCanvas1").getContext('2d');
    let myCtx2 = this.elementRef.nativeElement.querySelector("#dsCanvas2").getContext('2d');
    this.dsChart1 = new Chart(myCtx1,{
      type: 'doughnut',
      data: {
        datasets: [{
          data: [this.scmMetrics.open, this.scmMetrics.completedOnTime, this.scmMetrics.completedLate],
          backgroundColor: [
            "#0198bf",
            "#b2cc16",
            "#fec001",
          ],
        }],
        labels: [
          'Open',
          'Completed On Time',
          'Completed Late'
        ]
      },
      options: {
        legend: {
          onClick: (e) => e.stopPropagation()
        }
      }

    });


    this.dsChart2 = new Chart(myCtx2,{
      type: 'doughnut',
      dsThis: this,
      data: {
        datasets: [{
          data: [this.scmMetrics.openOnTime, this.scmMetrics.openLate, this.scmMetrics.openTooLate],
          backgroundColor: [
            "#c8e51a",
            "#fec001",
            "#F15B3C",
          ],
        }],
        labels: [
          'On Time',
          'Late',
          'Too Late'
        ]
      },
      options:{
        onClick: this.graphClickEvent,
        hover: {
          onHover: function(e, el) {
            $("#dsCanvas2").css("cursor", el[0] ? "pointer" : "default");
          }
        },
        legend: {
          onClick: (e) => e.stopPropagation()
        }
      }
    });
  }

  selectRow(value,item)
  {
    //console.log('clicked value '+value);
    console.dir(value);
    if (value)
    {
      if (this.selectedRows.indexOf(item.case_id)==-1)
        this.selectedRows.push(item.case_id);
    }

    else {
      var index = this.selectedRows.indexOf(item.case_id);
      if (index!=-1)
        this.selectedRows.splice(index,1);
    }
    console.dir(this.selectedRows);
  }

  unCheckAll()
  {
    for(var i=0;i<this.scmData.length;i++)
    {
      this.scmData[i].selected = false;
    }

  }

  sendReminder()
  {



    if (this.selectedRows.length==0) return false;
    var caseIds = this.selectedRows.join();

    this.selectedRows = [];
    this.unCheckAll();

    console.log(caseIds);
    this.scmService.getScmSendReminder(caseIds).subscribe(data => {
      console.dir(data);
      console.dir(caseIds);
      console.log('Sent mail');

      console.log('set reminder');
      const toast = this._notifications.create("Sent reminders mail(s)","For case id(s): " + caseIds,"success",{
        timeOut: 4000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
      });

    });

  }

  graphClickEvent(evt,item) {

    console.dir(item);
    let parentThis = item[0]['_chart']['config']['dsThis'];
    // here parentThis is the component this or $scope



    let index = item[0]['_index'];
    let type = '';
    if (index == 0 ) {
      type = 'onTime';
      parentThis.scmDisplayType = 'On Time';
    }
    if (index == 1 ) {
      type = 'late';
      parentThis.scmDisplayType = 'Late';
    }
    if (index == 2 ) {
      type = 'TooLate';
      parentThis.scmDisplayType = 'Too Late';
    }

    parentThis.scmType = type;
    parentThis.getScm(1);


  }

  ngAfterViewInit() {

    this.getScmmetrics();
    this.viewInit = true;

  }

  getScm(page):void {
    this.selectedRows = [];
    this.scmService.getScm(this.scmType,page).subscribe(data => {
      console.dir(data);
      this.scmData = data.result;

      for(var i=0;i<this.scmData.length;i++)
      {
        this.scmData[i].selected = false;
      }


      this.pagination.page = data.page;
      this.pagination.total = data.total;

    });
  }

  pageChanged(event) {
    console.dir(event);
    if (typeof event === "undefined") return false;
    var page = event;
    if (page == this.pagination.page ) return false;
    console.dir(page);
    this.getScm(page);
    return false;
  }

  getScmmetrics():void {
    this.scmService.getScmmetrics().subscribe(scmMetrics => {
      this.scmMetrics = scmMetrics;
      console.dir(scmMetrics);
      this.drawGraph();
    });
  }

  ngOnInit() {
    this.getScm(1);

  }

}
