import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  public readonly authURL = environment.url;

  // Register User
  public readonly REGISTER_USER: string = this.authURL + 'user/signup';
  // Login User
  public readonly LOGIN_USER: string = this.authURL + 'user/signin';
  // Search by ingredient and tag
  public readonly SEARCH_RECIPE_BY: string = this.authURL + 'recipe/searchby';
  // Get one recipe by id
  public readonly SEARCH_RECIPE_ID: string = this.authURL + 'recipe/searchid';
  // Get all recipes
  public readonly GET_RECIPES: string = this.authURL + 'recipe/getall';
  // Add recipe
  public readonly ADD_RECIPE: string = this.authURL + 'recipe/add';
  // Add ingredient from pantry
  public readonly ADD_PANTRY: string = this.authURL + 'pantry/add';
  // Remove ingredient from pantry
  public readonly REMOVE_PANTRY: string = this.authURL + 'pantry/remove';
  // Favorite recipe
  public readonly FAVORITE_RECIPE: string = this.authURL + 'recipe/favorite';
  // Unfavorite recipe
  public readonly UNFAVORITE_RECIPE: string = this.authURL + 'recipe/unfavorite';

  constructor(private http: HttpClient) { }
}
