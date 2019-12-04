import { Component, OnInit } from '@angular/core';
import { RecipeDialogComponent } from './components/recipe-dialog/recipe-dialog.component';
import { MatDialog } from '@angular/material';

//models
import { RecipeResult } from './core/models/RecipeResult';
import { Recipe } from './core/models/Recipe';
import { Ingredient } from './core/models/Ingredient';
import { HomeService } from './core/services/home.service';
import { RecipeSearch } from './core/models/RecipeSearch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PantryToTableApp';
  
  searchValue = '';

  //orginal from api
  ingredientsString: Array<string>;
  mealTypes: Array<string>;

  //search variables
  ingredients: Ingredient[] = [];
  selectedMealType: string;
  maxPrepTime: number = 120;
  
  recipeResults: Array<RecipeResult>;

  cloneIngredients: Ingredient[];
  selectedIngredients: Ingredient[];
  isOnlyShowSelected: boolean = false;
  
  recipe: Recipe = new Recipe();

  //WHAT IS THIS?
  // animal: string;
  // name: string;

  constructor(public dialog: MatDialog, private homeService: HomeService) {}
  
  ngOnInit() {
    this.getIngredients();
    this.getMealTypes();

    // for testing
    //this.getIngredientsTest();
  } 

  // actual api call to be used
  getIngredients() {
    this.homeService.getAllIngredients().subscribe(
      res => {
        if (res) {
          console.log(res)
          this.ingredientsString = res['response'] as Array<string>

          this.ingredientsString.forEach(i => this.ingredients.push({name: i, selected: false}))
          this.cloneIngredients = this.ingredients;
        } else {
          console.log('gettt R done with that getIngredients');
        }
      }
    )
  }

  getMealTypes() {
    this.homeService.getAllMealTypes().subscribe(
      res => {
        if (res) {
          console.log(res);
          this.mealTypes = res['response'];
        } else {
          console.log('fuck bruh the meal types doesnt work');
        }
      }
    )
  }
  
  onClearSearchValue() {
    //clear out searchValue
    this.searchValue = '';
    //restore all ingredients back to list
    this.cloneIngredients = this.ingredients;
    //reset maxPrepTime to max
    this.maxPrepTime = 120;
  }

  onRecipeSearch() {
    //uses mock recipes while apis aren't ready
    // this.getMockRecipes();

    //need selected ingredients, mealType, and maxPrepTime
    let recipeSearchParam: RecipeSearch = new RecipeSearch();
    
    // recipeSearchParam.ingredients = this.selectedIngredients
    recipeSearchParam.maxPrepTime = this.maxPrepTime;
    recipeSearchParam.mealType = this.selectedMealType ? this.selectedMealType : '';
    
    console.log(recipeSearchParam);
    this.homeService.getRecipeByFilter(recipeSearchParam).subscribe(
      res => {
        if (res) {
          this.recipeResults = res['response'] as Array<RecipeResult>;
        } else {
          console.log('onRecipeSearch didnt work');
        }
      }
    )
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
  
  //open the dialog and send the information to the component through "data"
  openDialog(recipeResult: RecipeResult): void {
    console.log(recipeResult);
    
    //TODO: uncomment api call - probably doesn't work 
    this.getRecipeById(recipeResult.recipeName);

    //TODO: comment this mock method out when api is set up
    // this.mockGetRecipeById(recipeResult);

    console.log('about to call dialogopen');
    console.log(this.recipe);

    this.dialog.open(RecipeDialogComponent, {
      data: { 
        recipeName: this.recipe.recipeName, 
        ingredients: this.recipe.ingredients,
        steps: this.recipe.steps,
        prepTime: this.recipe.prepTime,
        mealType: this.recipe.mealType
      }
    });
  }
  
  //api call for recipe
  getRecipeById(recipeName: string) {
    this.recipe = new Recipe();
    this.homeService.getRecipeById(recipeName).subscribe(
      res => {
        if (res) {
          console.log(res);
          this.recipe = res['response'];
        } else {
          console.log('no go on the getrecipebyid... string: ' + recipeName);
        }
      }
    )
  }

  mockGetRecipeById(recipeResult: RecipeResult) {
    this.recipe.recipeName = recipeResult.recipeName;
    this.recipe.prepTime = recipeResult.prepTime;
    this.recipe.mealType = recipeResult.mealType;
    this.recipe.ingredients = ['IngredientName1', 'IngredientName2', 'IngredientName3', 'IngredientName4', 'IngredientName5', 'IngredientName6', 'IngredientName7'];
    this.recipe.steps = [
      'This is a sentence to fullfill the step 1',
      'This is a sentence to fullfill the step 2',
      'This is a sentence to fullfill the step 3',
      'This is a sentence to fullfill the step 4',
      'This is a sentence to fullfill the step 5',
      'This is a sentence to fullfill the step 6',
      'This is a sentence to fullfill the step 7',
      'This is a sentence to fullfill the step 8',
      'This is a sentence to fullfill the step 9'
    ];
  }

  //get ingredients when page is initialized
  getIngredientsTest() {
    this.ingredients = this.getMockIngredients();
    this.cloneIngredients = this.ingredients;
  }

  //getRecipes() { service call by ingredients }



  // #Region MockData

  getMockRecipes() {
    this.recipeResults = [
    { mealType: 'blah', prepTime: 20, recipeName: 'Braised Cod with Celery'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Braised Salmon with Leeks'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Halibut with Ginger and Scallions'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Lemon Fish with Puree of Sweet Peas'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Mediterranean Cod with Tomatoes'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Miso Salmon'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Pasta with Clams'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Peanut Shrimp'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Poached Cod with Fennel and Cauliflower'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Poached Fish with Napa Cabbage'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Quick Broiled Halibut'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Quick Broiled Salmon with Ginger Mint Salsa'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Salmon in Citrus Sauce'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Salmon with Cucumber Chili Salad'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Salmon with Dill Sauce'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Salmon with Maple Dijon Glaze'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Salmon with Mustard'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Salmon with Mustard and Ginger'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Southwestern Cod Sauté'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Southwestern Salmon & Black Beans'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Spicy Asian Shrimp'},
    { mealType: 'blah', prepTime: 20, recipeName: 'Steamed Salmon and Asparagus with Mustard Dill Sauce'}
    ];
  }

  getMockIngredients(): Ingredient[] {
    return [
      { name: 'Almonds', selected: false },
      { name: 'Apple', selected: false },
      { name: 'Apricot', selected: false },
      { name: 'Asparagus', selected: false },
      { name: 'Avocado', selected: false },
      { name: 'Banana', selected: false },
      { name: 'Barley', selected: false },
      { name: 'Basil', selected: false },
      { name: 'Beef', selected: false },
      { name: 'Beet Greens', selected: false },
      { name: 'Beets', selected: false },
      { name: 'Bell Peppers', selected: false },
      { name: 'Black Beans', selected: false },
      { name: 'Black Pepper', selected: false },
      { name: 'Blueberries', selected: false },
      { name: 'Bok Choy', selected: false },
      { name: 'Broccoli', selected: false },
      { name: 'Brown Rice', selected: false },
      { name: 'Brussels Sprouts', selected: false },
      { name: 'Buckwheat', selected: false },
      { name: 'Cabbage', selected: false },
      { name: 'Cantaloupe', selected: false },
      { name: 'Carrots', selected: false },
      { name: 'Cashews', selected: false },
      { name: 'Cauliflower', selected: false },
      { name: 'Celery', selected: false },
      { name: 'Cheese', selected: false },
      { name: 'Chicken', selected: false },
      { name: 'Chili Peppers', selected: false },
      { name: 'Cilantro', selected: false },
      { name: 'Cinnamon', selected: false },
      { name: 'Cloves', selected: false },
      { name: 'Cod', selected: false },
      { name: 'Collard Greens', selected: false },
      { name: 'Corn', selected: false },
      { name: "Cow's milk", selected: false },
      { name: 'Cranberries', selected: false },
      { name: 'Cucumber', selected: false },
      { name: 'Cumin', selected: false },
      { name: 'Dill', selected: false },
      { name: 'Dried Peas', selected: false },
      { name: 'Eggplant', selected: false },
      { name: 'Eggs', selected: false },
      { name: 'Fennel', selected: false },
      { name: 'Figs', selected: false },
      { name: 'Flaxseeds', selected: false },
      { name: 'Garbanzo Beans', selected: false },
      { name: 'Garlic', selected: false },
      { name: 'Ginger', selected: false },
      { name: 'Grapefruit', selected: false },
      { name: 'Grapes', selected: false },
      { name: 'Green Beans', selected: false },
      { name: 'Green Peas', selected: false },
      { name: 'Kale', selected: false },
      { name: 'Kidney Beans', selected: false },
      { name: 'Kiwifruit', selected: false },
      { name: 'Lamb', selected: false },
      { name: 'Leeks', selected: false },
      { name: 'Lemons and Limes', selected: false },
      { name: 'Lentils', selected: false },
      { name: 'Lima Beans', selected: false },
      { name: 'Millet', selected: false },
      { name: 'Miso', selected: false },
      { name: 'Mushrooms, Crimini', selected: false },
      { name: 'Mushrooms, Shiitake', selected: false },
      { name: 'Mustard Greens', selected: false },
      { name: 'Mustard Seeds', selected: false },
      { name: 'Navy Beans', selected: false },
      { name: 'Oats', selected: false },
      { name: 'Olive Oil', selected: false },
      { name: 'Olives', selected: false },
      { name: 'Onions', selected: false },
      { name: 'Oranges', selected: false },
      { name: 'Oregano', selected: false },
      { name: 'Papaya', selected: false },
      { name: 'Parsley', selected: false },
      { name: 'Peanuts', selected: false },
      { name: 'Pear', selected: false },
      { name: 'Peppermint', selected: false },
      { name: 'Pineapple', selected: false },
      { name: 'Pinto Beans', selected: false },
      { name: 'Plum', selected: false },
      { name: 'Potatoes', selected: false },
      { name: 'Pumpkin Seeds', selected: false },
      { name: 'Quinoa', selected: false },
      { name: 'Raisins', selected: false },
      { name: 'Raspberries', selected: false },
      { name: 'Romaine Lettuce', selected: false },
      { name: 'Rosemary', selected: false },
      { name: 'Rye', selected: false },
      { name: 'Sage', selected: false },
      { name: 'Salmon', selected: false },
      { name: 'Sardines', selected: false },
      { name: 'Scallops', selected: false },
      { name: 'Sea Vegetables', selected: false },
      { name: 'Sesame Seeds', selected: false },
      { name: 'Shrimp', selected: false },
      { name: 'Soy Sauce', selected: false },
      { name: 'Soybeans', selected: false },
      { name: 'Spinach', selected: false },
      { name: 'Strawberries', selected: false },
      { name: 'Summer Squash', selected: false },
      { name: 'Sunflower Seeds', selected: false },
      { name: 'Sweet Potato', selected: false },
      { name: 'Swiss Chard', selected: false },
      { name: 'Tempeh', selected: false },
      { name: 'Thyme', selected: false },
      { name: 'Tofu', selected: false },
      { name: 'Tomatoes', selected: false },
      { name: 'Tuna', selected: false },
      { name: 'Turkey', selected: false },
      { name: 'Turmeric', selected: false },
      { name: 'Turnip Greens', selected: false },
      { name: 'Walnuts', selected: false },
      { name: 'Watermelon', selected: false },
      { name: 'Wheat', selected: false },
      { name: 'Winter Squash', selected: false },
      { name: 'Yogurt', selected: false }
    ];
  }

  // #EndRegion MockData

}
