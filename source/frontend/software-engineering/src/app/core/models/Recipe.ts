export class Recipe {
    recipeName: string;
    ingredients: string[];
    steps: string[];
    
    constructor() {
        this.recipeName = this.recipeName ? this.recipeName : null;
        this.ingredients = this.ingredients ? this.ingredients : null;
        this.steps = this.steps ? this.steps : null;
      }
}