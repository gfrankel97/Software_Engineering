export class RecipeSearch {
    ingredients: string[]
    maxPrepTime: number;
    mealType: string;

    constructor(input?: any) {
        this.ingredients = input.ingredients ? input.ingredients : null;
        this.maxPrepTime = input.maxPrepTime ? input.maxPrepTime : null;
        this.mealType = input.mealType ? input.mealType : null;
    }
}