import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Recipe } from '../models/recipe.model';
import { LoginService } from '../services/login.service';
import { RecipeService } from '../services/recipe.service';
import { ContextService } from '../services/context.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  user = new User();
  recipe = new Recipe();
  statusMessage: string;
  id: number;

  constructor(private router:Router, private _loginService:LoginService, private _recipeService:RecipeService, 
    private _contextService:ContextService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.ifLogged()){
      this.user.email = this._contextService.getEmail();
      this.user.token = this._contextService.getToken();
    }

    this.getRecipe(parseInt(localStorage.getItem("recipe") as string));
  }

  ifLogged(){
    if (localStorage.getItem("logged") == "true"){
      return true;
    }
    return false;
  }

  getRecipe(recipeId: number){
    this._recipeService.getRecipesById(recipeId).pipe(catchError(this.handleError)).subscribe((recipe) => { 
      this.recipe = recipe;
      console.log(this.recipe);
    }
    ),
    (err: Error) => {
      this.statusMessage = "Get Recipe Error";
      console.log(this.statusMessage, err)
    }
  }

  favorite(){
    this.id = this.recipe.id;
    this.recipe = new Recipe();
    this.recipe.id = this.id;

    this._recipeService.AddFavorite(this.user, this.recipe).pipe(catchError(this.handleError)).subscribe(() => { 
      this.toastr.success("Added as favorite")
      this.ngOnInit();
    }
    ),
    (err: Error) => {
      this.statusMessage = "Favorite Recipe Error";
      console.log(this.statusMessage, err)
    }
  }

  unfavorite(){
    this._recipeService.RemoveFavorite(this.user, this.recipe).pipe(catchError(this.handleError)).subscribe(() => { 
      this.toastr.success("Removed as favorite")
    }
    ),
    (err: Error) => {
      this.statusMessage = "Favorite Recipe Error";
      console.log(this.statusMessage, err)
    }
  }
  
  handleError(error: any){
    this.toastr.error("something failed")
    return throwError("error");
  }

}
