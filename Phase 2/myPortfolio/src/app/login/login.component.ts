import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginRef = new FormGroup({
    user:new FormControl(),
    pass:new FormControl()
  });
  msg:string=""
  constructor(public router:Router) { }   // DI

  ngOnInit(): void {
  }

  checkUser(){
    let login = this.loginRef.value; //controls("").
    if(login.user=="Jason" && login.pass=="123"){
        this.router.navigate(["home", login.user]);   //Appended name through path
    }
    else{
        this.msg = "Invalid username or password";
    }
  }
}
