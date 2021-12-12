import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';
import { ContextService } from '../services/context.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  statusMessage: string;

  constructor(private router:Router, private _loginService:LoginService, 
    private _contextService:ContextService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this._loginService.login(this.user).pipe(catchError(this.handleError)).subscribe((userData) => {
      this.user = <User>userData; this.loginAuth(this.user);
    }
    ),
    (err: Error) => {
      this.statusMessage = "Login Error";
      console.log(this.statusMessage, err)
    }
  }

  loginAuth(user: User){
    if (user != null){

      this.toastr.success("Logged in successfully")

      this._contextService.store(user);
      this.router.navigateByUrl('userHome')
    }
    else{
      this.reset();
    }

  }
  private reset(){
      this.user.id = -1;
      this.user.email = "";
      this.user.password = "";
  }

  handleError(error: Error){
    this.toastr.error("Login failed")
    return throwError("error");
  }


}
