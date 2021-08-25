import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Test } from '../test.model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-mdf-exam',
  templateUrl: './mdf-exam.component.html',
  styleUrls: ['./mdf-exam.component.css']
})
export class MdfExamComponent implements OnInit {

  allQuestions:Array<Test> = [];
  myForm:FormGroup;
  correctAnswers: any;
  constructor(public form:FormBuilder, public testSer:TestService){   //DI
    this.myForm=form.group({});
  }

  ngOnInit(): void {
    this.testSer.loadData().subscribe(result=> {
      for(let q of result){
        this.myForm.addControl(q.question, this.form.control(""));
        this.allQuestions.push(q)
      }
    })
  }

  selectedAnswers:Array<string>=[];
  getSelectedValues(){
      this.selectedAnswers = (<any>Object).values(this.myForm.value);
      this.correctAnswers = [];

    for (var i = 0; i < this.selectedAnswers.length; i++) {
      if(this.selectedAnswers[i] == this.allQuestions[i].correctAns)
      this.correctAnswers.push(this.selectedAnswers[i]);
    } 
    console.log(this.myForm.value);
    console.log(this.correctAnswers);
    
  }
}
