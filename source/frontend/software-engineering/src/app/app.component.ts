import { Component, OnInit } from '@angular/core';
import { RecipeDialogComponent } from './components/recipe-dialog/recipe-dialog.component';

//models
import { Ingredient } from './core/model/ingredient';
import { RecipeResult } from './core/model/recipeResult';
import { MatDialog } from '@angular/material';
import { Recipe } from './core/model/recipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PantryToTableApp';
  
  searchValue = '';

  ingredients: Ingredient[];
  recipes: RecipeResult[];
  maxPrepTime: number;

  cloneIngredients: Ingredient[];
  selectedIngredients: Ingredient[];
  isOnlyShowSelected: boolean = false;

  ngOnInit() {
    this.getIngredients();
  }

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(recipe: RecipeResult): void {
    console.log(recipe);
    this.dialog.open(RecipeDialogComponent, {
      data: { id: recipe.id, name: recipe.name, prepTime: recipe.prepTime }
    });
  }

  test() {
    console.log('test worked =D');
  }

  onClearSearchValue() {
    //clear out searchValue
    this.searchValue = '';
    //restore all ingredients back to list
    this.cloneIngredients = this.ingredients;
  }

  onRecipeSearch() {
    this.getRecipes();
  }

  onSearchIngredient(searchValue: string) {
    //clear current list
    this.cloneIngredients = [];
    //add all ingredients that start with search result
    this.ingredients.map(i => {
      if (i.name.toLowerCase().startsWith(searchValue.toLowerCase())) {
        this.cloneIngredients.push(i)
      }
    });
  }

  onSelectedIngredients() {
    let tmp: Ingredient[];

    if (this.isOnlyShowSelected) {
      this.onClearSearchValue();
      this.isOnlyShowSelected = false;
    } else {
      tmp = this.cloneIngredients.filter(i => i.selected == true);
      this.cloneIngredients = tmp;
      this.isOnlyShowSelected = true;
    }
  }

  //get ingredients when page is initialized
  getIngredients() {
    this.ingredients = this.getMockIngredients();
    this.cloneIngredients = this.ingredients;
  }

  //getRecipes() { service call by ingredients }

  //#region MockData
  getRecipes() {
    this.recipes = [
    { id: 1, prepTime: 20, name: 'Braised Cod with Celery'},
    { id: 1, prepTime: 20, name: 'Braised Salmon with Leeks'},
    { id: 1, prepTime: 20, name: 'Halibut with Ginger and Scallions'},
    { id: 1, prepTime: 20, name: 'Lemon Fish with Puree of Sweet Peas'},
    { id: 1, prepTime: 20, name: 'Mediterranean Cod with Tomatoes'},
    { id: 1, prepTime: 20, name: 'Miso Salmon'},
    { id: 1, prepTime: 20, name: 'Pasta with Clams'},
    { id: 1, prepTime: 20, name: 'Peanut Shrimp'},
    { id: 1, prepTime: 20, name: 'Poached Cod with Fennel and Cauliflower'},
    { id: 1, prepTime: 20, name: 'Poached Fish with Napa Cabbage'},
    { id: 1, prepTime: 20, name: 'Quick Broiled Halibut'},
    { id: 1, prepTime: 20, name: 'Quick Broiled Salmon with Ginger Mint Salsa'},
    { id: 1, prepTime: 20, name: 'Salmon in Citrus Sauce'},
    { id: 1, prepTime: 20, name: 'Salmon with Cucumber Chili Salad'},
    { id: 1, prepTime: 20, name: 'Salmon with Dill Sauce'},
    { id: 1, prepTime: 20, name: 'Salmon with Maple Dijon Glaze'},
    { id: 1, prepTime: 20, name: 'Salmon with Mustard'},
    { id: 1, prepTime: 20, name: 'Salmon with Mustard and Ginger'},
    { id: 1, prepTime: 20, name: 'Southwestern Cod Sauté'},
    { id: 1, prepTime: 20, name: 'Southwestern Salmon & Black Beans'},
    { id: 1, prepTime: 20, name: 'Spicy Asian Shrimp'},
    { id: 1, prepTime: 20, name: 'Steamed Salmon and Asparagus with Mustard Dill Sauce'}
    ];
  }

  getMockIngredients(): Ingredient[] {
    return [
      { name: 'Almonds', id: 1, selected: false },
      { name: 'Apple', id: 1, selected: false },
      { name: 'Apricot', id: 1, selected: false },
      { name: 'Asparagus', id: 1, selected: false },
      { name: 'Avocado', id: 1, selected: false },
      { name: 'Banana', id: 1, selected: false },
      { name: 'Barley', id: 1, selected: false },
      { name: 'Basil', id: 1, selected: false },
      { name: 'Beef', id: 1, selected: false },
      { name: 'Beet Greens', id: 1, selected: false },
      { name: 'Beets', id: 1, selected: false },
      { name: 'Bell Peppers', id: 1, selected: false },
      { name: 'Black Beans', id: 1, selected: false },
      { name: 'Black Pepper', id: 1, selected: false },
      { name: 'Blueberries', id: 1, selected: false },
      { name: 'Bok Choy', id: 1, selected: false },
      { name: 'Broccoli', id: 1, selected: false },
      { name: 'Brown Rice', id: 1, selected: false },
      { name: 'Brussels Sprouts', id: 1, selected: false },
      { name: 'Buckwheat', id: 1, selected: false },
      { name: 'Cabbage', id: 1, selected: false },
      { name: 'Cantaloupe', id: 1, selected: false },
      { name: 'Carrots', id: 1, selected: false },
      { name: 'Cashews', id: 1, selected: false },
      { name: 'Cauliflower', id: 1, selected: false },
      { name: 'Celery', id: 1, selected: false },
      { name: 'Cheese', id: 1, selected: false },
      { name: 'Chicken', id: 1, selected: false },
      { name: 'Chili Peppers', id: 1, selected: false },
      { name: 'Cilantro', id: 1, selected: false },
      { name: 'Cinnamon', id: 1, selected: false },
      { name: 'Cloves', id: 1, selected: false },
      { name: 'Cod', id: 1, selected: false },
      { name: 'Collard Greens', id: 1, selected: false },
      { name: 'Corn', id: 1, selected: false },
      { name: "Cow's milk", id: 1, selected: false },
      { name: 'Cranberries', id: 1, selected: false },
      { name: 'Cucumber', id: 1, selected: false },
      { name: 'Cumin', id: 1, selected: false },
      { name: 'Dill', id: 1, selected: false },
      { name: 'Dried Peas', id: 1, selected: false },
      { name: 'Eggplant', id: 1, selected: false },
      { name: 'Eggs', id: 1, selected: false },
      { name: 'Fennel', id: 1, selected: false },
      { name: 'Figs', id: 1, selected: false },
      { name: 'Flaxseeds', id: 1, selected: false },
      { name: 'Garbanzo Beans', id: 1, selected: false },
      { name: 'Garlic', id: 1, selected: false },
      { name: 'Ginger', id: 1, selected: false },
      { name: 'Grapefruit', id: 1, selected: false },
      { name: 'Grapes', id: 1, selected: false },
      { name: 'Green Beans', id: 1, selected: false },
      { name: 'Green Peas', id: 1, selected: false },
      { name: 'Kale', id: 1, selected: false },
      { name: 'Kidney Beans', id: 1, selected: false },
      { name: 'Kiwifruit', id: 1, selected: false },
      { name: 'Lamb', id: 1, selected: false },
      { name: 'Leeks', id: 1, selected: false },
      { name: 'Lemons and Limes', id: 1, selected: false },
      { name: 'Lentils', id: 1, selected: false },
      { name: 'Lima Beans', id: 1, selected: false },
      { name: 'Millet', id: 1, selected: false },
      { name: 'Miso', id: 1, selected: false },
      { name: 'Mushrooms, Crimini', id: 1, selected: false },
      { name: 'Mushrooms, Shiitake', id: 1, selected: false },
      { name: 'Mustard Greens', id: 1, selected: false },
      { name: 'Mustard Seeds', id: 1, selected: false },
      { name: 'Navy Beans', id: 1, selected: false },
      { name: 'Oats', id: 1, selected: false },
      { name: 'Olive Oil', id: 1, selected: false },
      { name: 'Olives', id: 1, selected: false },
      { name: 'Onions', id: 1, selected: false },
      { name: 'Oranges', id: 1, selected: false },
      { name: 'Oregano', id: 1, selected: false },
      { name: 'Papaya', id: 1, selected: false },
      { name: 'Parsley', id: 1, selected: false },
      { name: 'Peanuts', id: 1, selected: false },
      { name: 'Pear', id: 1, selected: false },
      { name: 'Peppermint', id: 1, selected: false },
      { name: 'Pineapple', id: 1, selected: false },
      { name: 'Pinto Beans', id: 1, selected: false },
      { name: 'Plum', id: 1, selected: false },
      { name: 'Potatoes', id: 1, selected: false },
      { name: 'Pumpkin Seeds', id: 1, selected: false },
      { name: 'Quinoa', id: 1, selected: false },
      { name: 'Raisins', id: 1, selected: false },
      { name: 'Raspberries', id: 1, selected: false },
      { name: 'Romaine Lettuce', id: 1, selected: false },
      { name: 'Rosemary', id: 1, selected: false },
      { name: 'Rye', id: 1, selected: false },
      { name: 'Sage', id: 1, selected: false },
      { name: 'Salmon', id: 1, selected: false },
      { name: 'Sardines', id: 1, selected: false },
      { name: 'Scallops', id: 1, selected: false },
      { name: 'Sea Vegetables', id: 1, selected: false },
      { name: 'Sesame Seeds', id: 1, selected: false },
      { name: 'Shrimp', id: 1, selected: false },
      { name: 'Soy Sauce', id: 1, selected: false },
      { name: 'Soybeans', id: 1, selected: false },
      { name: 'Spinach', id: 1, selected: false },
      { name: 'Strawberries', id: 1, selected: false },
      { name: 'Summer Squash', id: 1, selected: false },
      { name: 'Sunflower Seeds', id: 1, selected: false },
      { name: 'Sweet Potato', id: 1, selected: false },
      { name: 'Swiss Chard', id: 1, selected: false },
      { name: 'Tempeh', id: 1, selected: false },
      { name: 'Thyme', id: 1, selected: false },
      { name: 'Tofu', id: 1, selected: false },
      { name: 'Tomatoes', id: 1, selected: false },
      { name: 'Tuna', id: 1, selected: false },
      { name: 'Turkey', id: 1, selected: false },
      { name: 'Turmeric', id: 1, selected: false },
      { name: 'Turnip Greens', id: 1, selected: false },
      { name: 'Walnuts', id: 1, selected: false },
      { name: 'Watermelon', id: 1, selected: false },
      { name: 'Wheat', id: 1, selected: false },
      { name: 'Winter Squash', id: 1, selected: false },
      { name: 'Yogurt', id: 1, selected: false }
    ];
  }
  //#endRegion MockData

}
