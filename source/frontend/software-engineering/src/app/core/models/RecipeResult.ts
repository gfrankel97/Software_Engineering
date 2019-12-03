export class RecipeResult {
  mealType: string;
  prepTime: number;
  recipeName: string;

  constructor() {
    this.mealType = this.mealType ? this.mealType : null;
    this.prepTime = this.prepTime ? this.prepTime : null;
    this.recipeName = this.recipeName ? this.recipeName : null;
  }
}