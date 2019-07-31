import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from "../../services/server.service";
// import { TestStartedGuard } from '../../services/guards/TestStartedGuard/test-started.guard'


@Component({
  selector: 'app-test-paper',
  templateUrl: './test-paper.component.html',
  styleUrls: ['./test-paper.component.css']
})
export class TestPaperComponent implements OnInit {

  testPaper;
  answersMarked = [];
  score;
  submitted = false;
  scoreDetails = [];
  overlay = false;
  singleTestPaperArray = [];
  // singleTestPaperGeneratorForNext;
  singleTestPaperGeneratorForPrev;
  questionNumber = 0;
  checkedVar = false;
  totalQuestions;
  singleQuesTime = 30;
  timerVar;//time is in secs
  minutes = '';
  seconds = '';
  hurryTime;
  hurryMsg = '';
  interval;
  testStartedMessage : string = '';
  beforeSubmitVar:boolean = true;//to prevent running getTestpaper() after getting result and pressing ok on the result sheet, which makes ngOnInit run again, thus preventing the bug, where api to getResult is hit again and again.

  constructor(private Server: ServerService, private router : Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('refreshVar')){
      this.testStartedMessage = 'Please complete the test first'
      setTimeout(()=>{
        this.testStartedMessage = '';
      },5000)
    }
    if (localStorage.getItem('token') && this.beforeSubmitVar){
      this.timerVar = this.singleQuesTime;
      this.hurryTime = 10;
      this.getTestPaper();
    } else {
      localStorage.clear();
      sessionStorage.clear();      
      if (this.interval){
        clearInterval(this.interval)
      }
      this.router.navigate(['/login'])
    }
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();      
    clearInterval(this.interval);
    this.router.navigate(['/login'])
  }

  getTestPaper() {
    this.Server.getPaper().
      subscribe(res => {
        console.log(res);
        let dataIn = JSON.stringify(res);
        let dataOut = JSON.parse(dataIn);
        this.testPaper = dataOut.testPaper;//refresh, no need to save
        this.totalQuestions = this.testPaper.length;
        console.log(this.testPaper, 'testpaper');
        // this.singleTestPaperGeneratorForPrev = this.generatorFunctionForPrev(this.testPaper);
        //adding functionality for showing correct ans if no answers marked for a question at submit
        let refreshVar = this.customParse(sessionStorage.getItem('refreshVar'));
        if (refreshVar) {
          let questionNumber = this.customParse(sessionStorage.getItem('questionNumber'));
          let timerVar = this.customParse(sessionStorage.getItem('timerVar'));
          let answersMarked = this.customParse(sessionStorage.getItem('answersMarked'));
          // debugger;
          this.questionNumber = questionNumber
          this.singleTestPaperArray = [this.testPaper[questionNumber-1]];
          this.answersMarked= answersMarked;
          this.timerVar = timerVar;
          this.getTime(this.timerVar)
          this.quesTimer();
          // clearInterval(this.interval)
        } else {
          // this.generatorFunctionForNext(this.testPaper);          
          this.singleTestPaperArray = [this.generatorFunctionForNext(this.testPaper).next().value]
          for (let element of this.testPaper) {
            let quesId = element.question._id;
            this.answersMarked.push({
              quesId: quesId,
              marked: []
            })
          }//till here
          // this.timerVar = 56
          this.getTime(this.timerVar)
          this.quesTimer();
        }
      })
  }

  timerFinished() {
    if (this.questionNumber === this.totalQuestions) {
      clearInterval(this.interval)      
      console.log('qeqwrw1111')
      //clear the session storage here or in this.onsubmit() function
      sessionStorage.clear()
      this.onSubmit()
      // this.getTime(this.timerVar)            
    } else {
      this.timerVar = this.singleQuesTime;
      this.getTime(this.timerVar)
      this.quesTimer()
      clearInterval(this.interval);
      let variable = this.generatorFunctionForNext(this.testPaper).next().value;
      console.log(variable, 'variable11');
      this.singleTestPaperArray = [variable];
      console.log(this.singleTestPaperArray, ' array variable11');
    }
  }

  quesTimer() {
    this.interval = setInterval(() => {
      this.timerVar -= 1;
      this.getTime(this.timerVar);
      this.setSessionStorage();
    }, 1000)
    console.log('-----')
  }

  setSessionStorage() {
    // debugger;
    let refreshVar = this.customStringify(true)
    sessionStorage.setItem('refreshVar', refreshVar);
    let questionNumber = this.customStringify(this.questionNumber);
    sessionStorage.setItem('questionNumber', questionNumber);
    let timerVar = this.customStringify(this.timerVar);
    sessionStorage.setItem('timerVar', timerVar);
    let answersMarked = this.customStringify(this.answersMarked);
    sessionStorage.setItem('answersMarked', answersMarked);
  }

  customStringify(data) {
    return JSON.stringify(data)
  }

  customParse(data) {
    return JSON.parse(data)
  }

  getTime(timerVar) {
    // console.log(this.hurryMsg,'1')    
    this.minutes = Math.floor(timerVar / 60).toString();
    this.seconds = (timerVar % 60).toString();
    if (timerVar < this.hurryTime + 1) {
      this.hurryMsg = 'Hurry!!'
      // console.log(this.hurryMsg)
    } else {
      this.hurryMsg = ''
      // console.log(this.hurryMsg)
    }
    if (timerVar < 1) {//or timerVar===0
      this.timerFinished()
    }
  }

  isChecked(quesId, ansId) {
    for (let answer of this.answersMarked) {
      // // console.log(typeof (quesId), 'quesid',typeof(answer.quesId))
      if (quesId === answer.quesId) {
        let isCheckedVar = answer.marked.some((element) => {
          return element === ansId
        })
        return isCheckedVar
      }
    }
  }

  *generatorFunctionForNext(testPaper) {
    this.questionNumber += 1;
    yield testPaper[this.questionNumber - 1]
  }

  onNext() {
    let variable = this.generatorFunctionForNext(this.testPaper).next().value;
    console.log(variable, 'variable');
    this.singleTestPaperArray = [variable];
    clearInterval(this.interval);
    this.timerVar = this.singleQuesTime;
    this.getTime(this.timerVar)
    this.quesTimer()
    console.log(this.singleTestPaperArray, ' array variable');
  }

  inputChange(quesId, ansId, checkboxValue) {
    console.log(quesId, ansId, checkboxValue, 'on change');
    if (!this.answersMarked.length) {
      this.answersMarked.push({
        quesId: quesId,
        marked: [ansId]
      })
    } else {
      let isIdPresent = false;
      for (let data of this.answersMarked) {
        if (data.quesId === quesId) {
          isIdPresent = true
        }
      }
      if (isIdPresent) {
        // debugger
        this.answersMarked = this.answersMarked.map((value) => {
          let arrayMarked = value.marked
          // console.log('tttttttttttt')
          if (value.quesId === quesId) {
            // console.log('2222222222')
            for (let i in arrayMarked) {
              console.log('3333333', arrayMarked[i])
              if (arrayMarked[i] === ansId) {
                // console.log('44444444')
                arrayMarked.splice(i, 1);
                return { ...value, marked: arrayMarked }
              }
            }
            // console.log('5555555555555')
            arrayMarked.push(ansId);
            return { ...value, marked: arrayMarked }
          } else {
            // console.log('666666666666')
            return value
          }
        })
      } else {
        // console.log('77777777777')
        this.answersMarked.push({
          quesId: quesId,
          marked: [ansId]
        })
      }
    }
    console.log('Final fsdf', this.answersMarked)
  }

  radioChange(quesId, ansId) {
    console.log(quesId, ansId, 'on change');
    if (!this.answersMarked.length) {
      this.answersMarked.push({
        quesId: quesId,
        marked: [ansId]
      })
    } else {
      for (let i in this.answersMarked) {
        if (this.answersMarked[i].quesId === quesId) {
          this.answersMarked.splice(Number(i), 1)
        }
      }
      // console.log('77777777777')
      this.answersMarked.push({
        quesId: quesId,
        marked: [ansId]
      })
    }
    console.log('Final after radio change', this.answersMarked)
  }

  getReply(quesId) {
    if (this.scoreDetails.length) {
      // console.log(quesId, 'type', typeof (quesId));
      for (let element of this.scoreDetails) {
        // console.log(element, 'element', typeof (element.quesId))
        if (quesId === element.quesId) {
          return element.correct
        }
      }
      return false
    }
  }

  onSubmit() {
    this.beforeSubmitVar = false;
    sessionStorage.clear();
    //Error here 
    clearInterval(this.interval);
    clearInterval(this.interval);//Why second time?    
    this.submitted = true;
    console.log(this.answersMarked);
    this.Server.getResult(this.answersMarked).
      subscribe(res => {
        sessionStorage.clear();        
        console.log(res);
        let dataIn = JSON.stringify(res);
        let dataOut = JSON.parse(dataIn)
        this.score = dataOut.scoreData.score;
        this.overlay = true;
        this.scoreDetails = dataOut.scoreData.details
      })
  }

}
