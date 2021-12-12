import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';
import { RecipeService } from '../services/recipe.service';
import { ContextService } from '../services/context.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = new User();
  statusMessage: string;

  constructor(private router:Router, private _loginService:LoginService, private _recipeService:RecipeService, 
    private _contextService:ContextService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.user.email = this._contextService.getEmail();
    this.getUserInfo;
  }

  getUserInfo(){
    this._loginService.getInfo(this.user).pipe(catchError(this.handleError)).subscribe((userData) => { 
      this.user = userData,
      this._contextService.store(this.user);
    }
    ),
    (err: Error) => {
      this.statusMessage = "User Info Error";
      console.log(this.statusMessage, err)
    }
  }

  handleError(error: any){
    this.toastr.error("something failed")
    return throwError("error");
  }

}
