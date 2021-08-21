import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Test } from '../test.model';
import { TestService } from '../test.service';
import { NgModel } from '@angular/forms';
import { style } from '@angular/animations';

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
    this.allQuestions.forEach(()=>{
      this.selectedAnswers = Object.values(this.myForm.value);
    })
    console.log(this.selectedAnswers);

    for(var i=0; i<this.allQuestions.length; i++){
      let highlight = this.selectedAnswers[i];
      console.log(highlight);   //returns an element

      if(highlight === this.allQuestions[i].correctAns){
        if(this.selectedAnswers === null){
        }
        else{
          highlight.style.backgroundColor = "lightgreen";
        }
      }
      else{
          highlight.style.backgroundColor = "#F94F4F";
      }
    }
  }

}
