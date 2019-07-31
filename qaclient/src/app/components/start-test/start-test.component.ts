import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-test',
  templateUrl: './start-test.component.html',
  styleUrls: ['./start-test.component.css']
})
export class StartTestComponent implements OnInit {

  constructor(private router : Router) { }
  name;

  ngOnInit() {
    this.name = localStorage.getItem('name');
  }

  startTest(){
    this.router.navigate(['/test'])
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

}
