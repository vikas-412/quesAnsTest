import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ServerService } from "../../services/server.service";
import { CheckRoleService } from '../../services/check-role.service';
import { AddEditQuesAnsService } from "../../services/add-edit-ques-ans.service";


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  allQuesAns: any[];
  overlay: boolean = false;
  subscription: Subscription;
  purpose: string;
  editAtIndex: number;
  editData;

  constructor(private checkRoleService: CheckRoleService, private Server: ServerService, private addEditQuesAnsService: AddEditQuesAnsService, private router: Router) { }

  ngOnInit() {
    this.checkRoleService.isAdmin();
    // console.log(isAdmin,'isAdmin var -------')
    // console.log('true');
    this.Server.getAdminData().
      subscribe(res => {
        console.log(res);
        let dataIn = JSON.stringify(res);
        let dataOut = JSON.parse(dataIn);
        if (!dataOut.success) {
          alert(dataOut.message);
        } else {
          this.allQuesAns = dataOut.allQuesAns;
          this.addEditQuesAnsService.quesAnsSubject.
            subscribe((datagot) => {
              let datagotIn = JSON.stringify(datagot);
              let datagotOut = JSON.parse(datagotIn);
              switch (datagotOut.purpose) {
                case "add": {
                  this.allQuesAns.push(datagotOut.newData);
                  console.log('this line is after add service', this.allQuesAns);
                  break;
                }
                case "edit": {
                  // this.allQuesAns.push(datagotOut.newData);                  
                  break;
                }
              }
            })
        }
      })
  }

  startTest() {
    this.router.navigate(['/test'])
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  addNew() {
    this.overlay = true;
    this.purpose = 'add'
  }

  getCorrectAns(correctAnsArray, answersArray) {
    let correctAnswers = [];
    for (let correctAns of correctAnsArray) {
      for (let answers of answersArray) {
        if (correctAns.ansId === answers._id) {
          correctAnswers.push(answers.ans);
        }
      }
    }
    return correctAnswers;
  }

  editQues(singleQA, i) {
    this.editAtIndex = i;
    this.overlay = true;
    this.purpose = 'edit'
    this.editData = singleQA;
    console.log(this.editData, 'edit data')
  }

  deleteQues(singleQA, i) {
    console.log('singleQA', singleQA);
    this.Server.deleteQA(singleQA).
      subscribe(res => {
        console.log(res);
        let dataIn = JSON.stringify(res);
        let dataOut = JSON.parse(dataIn);
        if (dataOut.success) {
          let filtered = this.allQuesAns.filter((val, index) => {
            if (i !== index) {
              return true;
            } else return false
          });
          this.allQuesAns = filtered;
        }
      })
  }

  setTestPaper() { }

}
