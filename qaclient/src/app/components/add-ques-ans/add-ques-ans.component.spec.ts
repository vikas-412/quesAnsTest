import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuesAnsComponent } from './add-ques-ans.component';

describe('AddQuesAnsComponent', () => {
  let component: AddQuesAnsComponent;
  let fixture: ComponentFixture<AddQuesAnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuesAnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuesAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
