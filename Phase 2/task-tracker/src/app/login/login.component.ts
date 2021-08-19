import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public loginSer:LoginService,
    public router:Router
  ) { }   //DI for Login Service
  
  ngOnInit(): void {
  }

  msg?:string=""
  checkUser(loginRef:NgForm){
    let login = loginRef.value;
    let flag = 0;
    this.loginSer.checkUserInfo().subscribe(result=> {
      for(let ll of result){
        if(ll.user == login.user && ll.pass == login.pass){
          flag++;
          this.router.navigate(["home", login.user]);
        }
      }
        if(flag>0){
          this.msg="Successfully login"
        }
        else{
          this.msg="Failure login"
        }
    });
    flag = 0;
  }
}
