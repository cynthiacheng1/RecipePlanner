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
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  user = new User();
  statusMessage: string;
  recipes: Recipe[]
  ingredient: string;
  tag: string;

  constructor(private router:Router, private _loginService:LoginService, private _recipeService:RecipeService, 
    private _contextService:ContextService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.ifLogged()){
      this.user.email = this._contextService.getEmail();
    }
  }

  ifLogged(){
    if (localStorage.getItem("logged") == "true"){
      return true;
    }
    return false;
  }

  getFavorites(){
    this._recipeService.getFavorites(this.user).pipe(catchError(this.handleError)).subscribe((recipes) => { 
      this.recipes = recipes.data;
      console.log(this.recipes);
    }
    ),
    (err: Error) => {
      this.statusMessage = "Favorite Recipes Error";
      console.log(this.statusMessage, err)
    }
  }

  getAllRecipes(){
    this._recipeService.getAllRecipes().pipe(catchError(this.handleError)).subscribe((recipes) => { 
      this.recipes = recipes.data;
      console.log(this.recipes);
    }
    ),
    (err: Error) => {
      this.statusMessage = "All Recipes Error";
      console.log(this.statusMessage, err)
    }
  }

  clickedRecipe(recipe: Recipe){

    localStorage.setItem("recipe", recipe.id.toString());
    this.router.navigate(['/recipe'])

  }

  getAllFilteredRecipes(){

    this._recipeService.getRecipesSearchBy(this.tag).pipe(catchError(this.handleError)).subscribe((recipes) => { 
      this.recipes = recipes.data;
      console.log(this.recipes);
    }
    ),
    (err: Error) => {
      this.statusMessage = "All Recipes Error";
      console.log(this.statusMessage, err)
    }
  }

  getAllPantryRecipes(){
    this._recipeService.getRecipesPantry(this.user).pipe(catchError(this.handleError)).subscribe((recipes) => { 
      this.recipes = recipes.data;
      console.log(this.recipes);
    }
    ),
    (err: Error) => {
      console.log(err);
      this.statusMessage = "Pantry Recipes Error";
      console.log(this.statusMessage, err)
    }
  }

  italian(){
    this.tag = "italian";
    this.getAllFilteredRecipes();
  }

  healthy(){
    this.tag = "healthy";
    this.getAllFilteredRecipes()
  }

  vegetarian(){
    this.tag = "vegetarian";
    this.getAllFilteredRecipes();
  }

  all(){
    this.tag = "";
    this.getAllRecipes();
  }

  handleError(error: any){
    this.toastr.error("something failed")
    return throwError("error");
  }

}
