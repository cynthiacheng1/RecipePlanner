import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EndpointsService } from './endpoints.service';
import { Recipe } from '../models/recipe.model';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private _httpService: HttpClient, private endpoints: EndpointsService) { }

  getRecipesSearchBy(ingredient: string, tag: string): Observable<any>{
    return this._httpService.get(this.endpoints.SEARCH_RECIPE_BY + '/' + ingredient + '/' + tag);
  }

  getRecipesById(id: number, user: User): Observable<any>{
    return this._httpService.get(this.endpoints.SEARCH_RECIPE_ID + '/' + id, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  getAllRecipes(): Observable<any>{
    return this._httpService.get(this.endpoints.GET_RECIPES);
  }

  getFavorites(user: User): Observable<any>{
    return this._httpService.get(this.endpoints.GET_FAVOTIRE_RECIPES + '/' + user.id, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  AddFavorite(user: User, recipe: Recipe): Observable<any>{
    return this._httpService.put(this.endpoints.FAVORITE_RECIPE + '/' + user.id, recipe, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  RemoveFavorite(user: User, recipe: Recipe): Observable<any>{
    return this._httpService.put(this.endpoints.UNFAVORITE_RECIPE + '/' + user.id, recipe, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  getRecipesPantry(user: User): Observable<any>{
    return this._httpService.get(this.endpoints.GET_PANTRY_RECIPES + '/' + user.id, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  AddRecipe(user: User, recipe: Recipe): Observable<any>{
    return this._httpService.put(this.endpoints.ADD_RECIPE + '/' + user.id, recipe, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  AddPantryIngredient(user: User, ingredient: string): Observable<any>{
    return this._httpService.put(this.endpoints.ADD_PANTRY + '/' + user.id, ingredient, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  RemovePantryIngredient(user: User, ingredient: string): Observable<any>{
    return this._httpService.put(this.endpoints.REMOVE_PANTRY + '/' + user.id, ingredient, {headers: new HttpHeaders({'Authorization' : user.token})});
  }

  SeePantryIngredients(user: User): Observable<any>{
    return this._httpService.put(this.endpoints.GET_PANTRY + '/' + user.id, {headers: new HttpHeaders({'Authorization' : user.token})});
  }
}