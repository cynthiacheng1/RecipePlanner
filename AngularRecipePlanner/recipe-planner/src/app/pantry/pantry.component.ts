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
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnInit {

  user = new User();
  ingredients: Array<string>;
  ingredient: string;
  statusMessage: string;

  constructor(private router:Router, private _loginService:LoginService, private _recipeService:RecipeService, 
    private _contextService:ContextService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem("logged") == "true"){
      this.user.email = this._contextService.getEmail();
      this.user.token = this._contextService.getToken();
      this.getPantryIngredients();
      this.ingredient = "";
    } else {
      this.router.navigate(['login']);
    }
  }

  getPantryIngredients(){
    this._recipeService.SeePantryIngredients(this.user).pipe(catchError(this.handleError)).subscribe((ingredients) => {
      this.ingredients = ingredients.data;
      console.log(this.ingredients)
    }
    ),
    (err: Error) => {
      this.statusMessage = "Pantry Ingredients Error";
      console.log(this.statusMessage, err)
    }
  }

  addIngredient(){
    console.log(this.ingredient)
    console.log(this.user.token)
    this._recipeService.AddPantryIngredient(this.user, this.ingredient).pipe(catchError(this.handleError)).subscribe(() => { 
      this.toastr.success(this.ingredient + " added to your pantry")
      this.ngOnInit();
    }
    ),
    (err: Error) => {
      this.statusMessage = "Pantry Add Ingredient Error";
      console.log(this.statusMessage, err)
    }
  }

  removeIngredient(){
    this._recipeService.RemovePantryIngredient(this.user, this.ingredient).pipe(catchError(this.handleError)).subscribe(() => { 
      this.toastr.success(this.ingredient + " removed from your pantry")
      this.ngOnInit();
    }
    ),
    (err: Error) => {
      this.statusMessage = "Pantry Remove Ingredient Error";
      console.log(this.statusMessage, err)
    }
  }

  handleError(error: any){
    this.toastr.error("something failed")
    return throwError("error");
  }

}
