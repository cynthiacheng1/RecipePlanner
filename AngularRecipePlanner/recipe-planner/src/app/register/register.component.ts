import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model'
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { ContextService } from '../services/context.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();
  secondpassword: string;
  same: boolean;
  statusMessage: string;

  constructor(private router:Router, private _loginService:LoginService, 
    private _contextService:ContextService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register(){

    if (this.user.password != this.secondpassword){
      this.same = false;
      console.log("False")
    }
    else{
      this._loginService.register(this.user).subscribe((userData) => {
        this.user = <User>userData; this.registerAuth(this.user);
      }),
      (err: Error) => {
        this.statusMessage = "Login Error";
        console.log(this.statusMessage, err)
      }
    }
  }

  registerAuth(user: User){
    if (user != null) {
      this._contextService.store(user);
      this.router.navigateByUrl('userHome')
    } else {
      this.reset();
    }    
  }

  private reset(){
    
  }

}
