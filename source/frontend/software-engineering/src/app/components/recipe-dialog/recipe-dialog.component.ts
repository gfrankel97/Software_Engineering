import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { RecipeResult } from '../../core/model/recipeResult';
import { Recipe } from '../../core/model/recipe';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent {
  testRecipe: RecipeResult;

  constructor(
    public dialogRef: MatDialogRef<RecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public recipe: RecipeResult) { }

  onNoClick(): void {
    console.log(this.recipe);
    this.dialogRef.close();
  }

}