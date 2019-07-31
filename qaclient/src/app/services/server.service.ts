import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http : HttpClient) { }

  signupServer = (signupData) => {
    return this.http.post(`${environment.server}/signup`, signupData)
  }
  loginServer(loginData) {
    return this.http.post(`${environment.server}/login`, loginData)
  }
  addQuesAnsServer(data){
    return this.http.post(`${environment.server}/add`,data)
  }
  getPaper(){
    return this.http.get(`${environment.server}/testpaper`)
  }
  getResult(data) {
    return this.http.post(`${environment.server}/getresult`,data)
  }
  checkRole(){
    return this.http.get(`${environment.server}/checkrole`)
  }
  getAdminData(){
    return this.http.get(`${environment.server}/getadminpage`)
  }
  deleteQA(deleteData){
    return this.http.post(`${environment.server}/deleteQA`,deleteData)
  }
}
