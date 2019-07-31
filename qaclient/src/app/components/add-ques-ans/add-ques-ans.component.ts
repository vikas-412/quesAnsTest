import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

import { ServerService } from "../../services/server.service";
import { AddEditQuesAnsService } from "../../services/add-edit-ques-ans.service";

@Component({
  selector: 'app-add-ques-ans',
  templateUrl: './add-ques-ans.component.html',
  styleUrls: ['./add-ques-ans.component.css']
})
export class AddQuesAnsComponent implements OnInit {

  submitted = false;

  constructor(private fb: FormBuilder, private Server: ServerService, private addEditQuesAnsService: AddEditQuesAnsService, private router: Router) { }

  quesAnsForm = this.fb.group({
    ques: ['', Validators.required],
    ans1: ['', Validators.required],
    ans2: ['', Validators.required],
    ans3: ['', Validators.required],
    ans4: ['', Validators.required],
    rightAns: this.fb.group({
      ans1: [false],
      ans2: [false],
      ans3: [false],
      ans4: [false]
    })
  })

  @Input() overlay;
  @Input() purpose;
  @Input() editData;
  @Output() overlayEvent = new EventEmitter();

  ngOnInit() {
    if (this.purpose === "edit") {
      console.log(true)
      this.quesAnsForm.patchValue({
        ques: this.editData.question.ques,
        ans1: this.editData.answers[0].ans,
        ans2: this.editData.answers[1].ans,
        ans3: this.editData.answers[2].ans,
        ans4: this.editData.answers[3].ans,
      })
      this.getCorrectAns();
    }
  }

  getCorrectAns() {
    let correctAnsCheckArray = [];
    for (let answer of this.editData.answers) {
      let checkCorrect = this.editData.correctAns.some((element) => {
        return element.ansId === answer._id
      })
      correctAnsCheckArray.push(checkCorrect);
    }
    console.log(correctAnsCheckArray, '------');
    this.quesAnsForm.patchValue({
      rightAns: {
        ans1: correctAnsCheckArray[0],
        ans2: correctAnsCheckArray[1],
        ans3: correctAnsCheckArray[2],
        ans4: correctAnsCheckArray[3]
      }
    })
  }

  get formControls() {
    return this.quesAnsForm.controls;
  }

  toggleOverlay() {
    this.overlay = false
    this.overlayEvent.emit(this.overlay);
  }

  add() {
    console.log(this.quesAnsForm.value,"check add data");
    // this.Server.addQuesAnsServer(this.quesAnsForm.value).
    //   subscribe(res => {
    //     console.log(res, 'Add response');
    //     let dataIn = JSON.stringify(res);
    //     let dataOut = JSON.parse(dataIn);
    //     if (!dataOut.success) {
    //       alert(`${dataOut.message} Please try again.`)
    //     } else {
    //       let sendObj = {
    //         purpose: this.purpose,
    //         newData: {
    //           question: dataOut.question,
    //           answers: dataOut.answers,
    //           correctAns: dataOut.correctAns
    //         }
    //       }
    //       this.addEditQuesAnsService.sendNewQuesAns(sendObj);
    //       console.log('success in adding');
    //       this.toggleOverlay();
    //     }
    //   })
  }

  edit() { }

  onSubmit() {
    this.submitted = true;
    // console.log('quesansform',this.quesAnsForm.value);
    if (this.quesAnsForm.invalid) {
      console.log(this.quesAnsForm.status);
      return
    }
    else {
      switch (this.purpose) {
        case "add": {
          this.add();
          break;
        }
        case "edit": {
          this.edit();
          break;
        }
      }
    }
  }

}
