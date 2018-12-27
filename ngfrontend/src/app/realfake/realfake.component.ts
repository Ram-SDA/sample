import { Component, OnInit } from '@angular/core';

import { DSGREALFAKE } from '../../datas/data';

@Component({
  selector: 'app-realfake',
  templateUrl: './realfake.component.html',
  styleUrls: ['./realfake.component.css']
})
export class RealfakeComponent implements OnInit {

  collections = DSGREALFAKE;
  quizStatus = "NEW";
  questionStatus = "Q";
  currentAnswer = true;

  score = 0;
  current = 0;
  size = 0;

  constructor() {
    this.size = this.collections.length;
  }

  startQuiz()  {
    this.quizStatus = "OPEN";
    this.current = 0;
    this.score = 0;
  }

  restartQuiz()  {
    this.quizStatus = "OPEN";
    this.current = 0;
    this.score = 0;
  }

  nextQuestion() {
    this.current++;
    this.questionStatus = "Q";
    if (this.current >= this.size) this.quizStatus = "END";
  }

  selectRealImage() {
    this.currentAnswer = true;
    if (this.collections[this.current].real) this.score++;
    this.questionStatus = "A";
  }

  selectAIImage() {
    this.currentAnswer = false;
    if (!this.collections[this.current].real) this.score++;
    this.questionStatus = "A";
  }


  ngOnInit() {
  }

}
