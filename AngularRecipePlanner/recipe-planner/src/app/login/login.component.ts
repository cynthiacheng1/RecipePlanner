import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';
import { ContextService } from '../services/context.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
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
  parsedToken: any;

  constructor(private router:Router, private _loginService:LoginService, 
    private _contextService:ContextService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    console.log(this.user);
    this._loginService.login(this.user).pipe(catchError(this.handleError)).subscribe((tokenData) => {
      console.log(tokenData);
      this.loginAuth(tokenData.token);
    }
    ),
    (err: Error) => {
      this.statusMessage = "Login Error";
      console.log(this.statusMessage, err)
    }
  }

  loginAuth(tokenData: string){
    try{
      this.user.token = tokenData;
      this._contextService.store(this.user);
      this.router.navigateByUrl('home')
      this.toastr.success("Logged in successfully")

    } catch(error: any){

      this.reset();
      this.handleError(error);
    }
  }
  
  private reset(){
      this.user = new User();
  }

  handleError(error: any){
    console.log(error);
    this.toastr.error("Login failed")
    return throwError("error");
  }


}
