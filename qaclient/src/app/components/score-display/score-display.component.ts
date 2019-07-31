import { Component, OnInit, Input, Output  } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-score-display',
  templateUrl: './score-display.component.html',
  styleUrls: ['./score-display.component.css']
})
export class ScoreDisplayComponent implements OnInit {

  constructor() { }
  @Input() overlay;
  @Input() score; 
  @Input() totalQuestions;  
  @Input() scoreDetails;   
  @Output() overlayEvent = new EventEmitter();

  ngOnInit() {
    console.log(this.scoreDetails,'sdfghjk')
  }

  // onTest(){
  //   let array1=[{a:1,b:2},{a:4,b:4}]
  //   // sessionStorage.setItem('Name', JSON.stringify(array1));
  //   let name =JSON.parse(sessionStorage.getItem('Name'));
  //   console.log(name,typeof(name),'111111111');

  // }

  toggleOverlay(){
    this.overlay=false;
    this.overlayEvent.emit(this.overlay);
  }

}
