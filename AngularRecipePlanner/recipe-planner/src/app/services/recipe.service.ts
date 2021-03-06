import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndpointsService } from './endpoints.service';
import { Recipe } from '../models/recipe.model';
import { Recipe2 } from '../models/recipe2.model';
import { User } from '../models/user.model';
import { SingleIngredient } from '../models/single-ingredient.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  thisSingleIngredient = new SingleIngredient();
  user = new User();
  recipe = new Recipe();

  constructor(private _httpService: HttpClient, private endpoints: EndpointsService) { }

  getRecipesSearchBy(tag: string): Observable<any>{
    return this._httpService.get(this.endpoints.RECIPE + '?tag=' + tag);
  }

  getRecipesById(id: number): Observable<any>{
    return this._httpService.get(this.endpoints.RECIPE + '?id=' + id);
  }

  getAllRecipes(): Observable<any>{
    return this._httpService.get(this.endpoints.RECIPE);
  }

  getFavorites(user: User): Observable<any>{
    return this._httpService.get(this.endpoints.GET_FAVOTIRE_RECIPES, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  AddFavorite(user: User, recipe: Recipe): Observable<any>{
    console.log(recipe)
    console.log(user.token)

    this.user = user;
    this.recipe = recipe;

    return this._httpService.post(this.endpoints.FAVORITE_RECIPE, recipe, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  RemoveFavorite(user: User, recipe: Recipe): Observable<any>{

    this.user = user;
    this.recipe = recipe;

    return this._httpService.post(this.endpoints.UNFAVORITE_RECIPE, recipe, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  getRecipesPantry(user: User): Observable<any>{
    return this._httpService.get(this.endpoints.GET_PANTRY_RECIPES, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  AddRecipe(user: User, recipe: Recipe2): Observable<any>{
    return this._httpService.post(this.endpoints.RECIPE, recipe, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  AddPantryIngredient(user: User, ingredient: string): Observable<any>{
    console.log(user.token)
    console.log(ingredient)

    this.thisSingleIngredient.theIngredient = ingredient;

    return this._httpService.post(this.endpoints.ADD_PANTRY + "/addpantry", this.thisSingleIngredient, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  RemovePantryIngredient(user: User, ingredient: string): Observable<any>{

    this.thisSingleIngredient.theIngredient = ingredient;
    return this._httpService.post(this.endpoints.REMOVE_PANTRY + '/pantry-delete', this.thisSingleIngredient, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  SeePantryIngredients(user: User): Observable<any>{
    return this._httpService.get(this.endpoints.GET_PANTRY, {headers: new HttpHeaders({'Authorization' : user.token})});
  }
}