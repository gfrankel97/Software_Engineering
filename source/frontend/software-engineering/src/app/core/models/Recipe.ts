export class Recipe {
  recipeName: string;
  ingredients: string[];
  steps: string[];
  prepTime: number;
  mealType: string;
  
  constructor() {
    this.recipeName = this.recipeName ? this.recipeName : null;
    this.ingredients = this.ingredients ? this.ingredients : null;
    this.steps = this.steps ? this.steps : null;
    this.prepTime = this.prepTime ? this.prepTime : null;
    this.mealType = this.mealType ? this.mealType : null;
  }
}