export class RecipeSearch {
    ingredients: string[]
    maxPrepTime: number;
    mealType: string;

    constructor() {
        this.ingredients = this.ingredients ? this.ingredients : [];
        this.maxPrepTime = this.maxPrepTime ? this.maxPrepTime : null;
        this.mealType = this.mealType ? this.mealType : null;
    }
}