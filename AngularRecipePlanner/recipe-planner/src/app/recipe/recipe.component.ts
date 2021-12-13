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

  constructor(private router:Router, private _loginService:LoginService, private _recipeService:RecipeService, 
    private _contextService:ContextService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.ifLogged()){
      this.user.email = this._contextService.getEmail();
    }

    this.getRecipe(parseInt(localStorage.getItem("recipe") as string));
    localStorage.removeItem("recipe");
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

  // check if 200 response works
  favorite(recipe: Recipe){
    this._recipeService.AddFavorite(this.user, recipe).pipe(catchError(this.handleError)).subscribe((recipe) => { 
      this.recipe = recipe;
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
