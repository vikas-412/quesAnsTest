import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class AddEditQuesAnsService {

  constructor() { }

  public quesAnsSubject = new Subject();

  sendNewQuesAns(value) {
    this.quesAnsSubject.next(value)
  }
}
