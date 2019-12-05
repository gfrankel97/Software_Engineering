import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';

import { ServiceBase } from '../../shared/baseClasses/service-base'

import { RecipeSearch } from '../models/RecipeSearch';
import { RecipeResult } from '../models/RecipeResult';
import { Recipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends ServiceBase {

  constructor(private _httpClient: HttpClient) {
    super(_httpClient);
  }

  //gets all ingredients when app opens
  getAllIngredients(): Observable<string[]> {
    return this.get('GetAllIngredients');
  }

  //gets all mealtypes when app opens
  getAllMealTypes(): Observable<string[]> {
    return this.get('GetAllMealTypes');
  }

  //gets recipe results when user searches based off recipe search criteria
  getRecipeByFilter(recipeSearch: RecipeSearch): Observable<any> {
    return this.getWithParams('GetRecipeByFilter', recipeSearch);
  }

  //gets full recipe information based off recipe name
  getRecipeById(RecipeResult: RecipeResult): Observable<any> {
    return this.getWithParams('GetRecipeById', RecipeResult);
  }
}