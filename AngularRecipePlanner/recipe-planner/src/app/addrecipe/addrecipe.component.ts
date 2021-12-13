import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Recipe2 } from '../models/recipe2.model';
import { LoginService } from '../services/login.service';
import { RecipeService } from '../services/recipe.service';
import { ContextService } from '../services/context.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Component({
  selector: 'app-addrecipe',
  templateUrl: './addrecipe.component.html',
  styleUrls: ['./addrecipe.component.css']
})
export class AddrecipeComponent implements OnInit {

  recipe = new Recipe2();
  user = new User();
  statusMessage: string;
  
  constructor(private router:Router, private _loginService:LoginService, private _recipeService:RecipeService, 
    private _contextService:ContextService, private toastr: ToastrService) {}

    ngOnInit(): void {
      if(this.ifLogged()){
        this.user.email = this._contextService.getEmail();
        this.user.token = this._contextService.getToken();
      }
    }
  
    ifLogged(){
      if (localStorage.getItem("logged") == "true"){
        return true;
      }
      return false;
    }

    addRecipe(){
      console.log(this.recipe)
      console.log(localStorage.getItem("token"))
      this._recipeService.AddRecipe(this.user, this.recipe).pipe(catchError(this.handleError)).subscribe((recipes) => { 
        this.toastr.success("Recipe Added!")
        location.reload();
      }
      ),
      (err: Error) => {
        this.statusMessage = "Add Recipe Error";
        console.log(this.statusMessage, err)
      }
    }

  handleError(error: any){
    this.toastr.error("something failed")
    return throwError("error");
  }

}
