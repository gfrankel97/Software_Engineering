from DB_Engine import session
import Views as view

view.CreateUser(session, "user_one", "password_one")
view.CreateUser(session, "user_two", "password_two")

view.CreateIngredient(session, "ingredient_one")
view.CreateIngredient(session, "ingredient_two")
view.CreateIngredient(session, "ingredient_three")
view.CreateIngredient(session, "ingredient_four")

view.CreateRecipe(session, {
	"RecipeName":"recipe_one",
	"Ingredients": [
		"ingredient_one",
		"ingredient_two",
		"ingredient_three"
	],
	"steps":"instructions",
	"MealType":"MealType_one",
	"PrepTime":1,
})
view.CreateRecipe(session, {
	"RecipeName":"recipe_two",
	"Ingredients": [
		"ingredient_three",
		"ingredient_four"
	],
	"steps":"instructions",
	"MealType":"MealType_two",
	"PrepTime":1,
})
view.CreateRecipe(session, {
	"RecipeName":"recipe_three",
	"Ingredients": [
		"ingredient_four",
		"ingredient_five"
	],
	"steps":"instructions",
	"MealType":"MealType_one",
	"PrepTime":3,
})
view.CreateRecipe(session, {
	"RecipeName":"recipe_four",
	"Ingredients": [
		"ingredient_one",
		"ingredient_two",
		"ingredient_three"
	],
	"steps":"instructions",
	"MealType":"MealType_one",
	"PrepTime":2,
})

#login tests
print("\n\nLOGIN TESTS\n")

print("Login Pass Test")
print(view.Login(session, "user_one", "password_one") == True)

print("Login Fail Test")
print(view.Login(session, "user_two", "password_one") == False)

#ingredient get tests
print("\n\nINGREDIENT GET TESTS\n")

print("Get all ingredients test")
all_ingredients = view.GetAllIngredients(session)
print(len(all_ingredients) == 5)

#ingredient get tests
print("\n\nUSER INGREDIENT TESTS\n")
print("Set/Get users ingredients test")
view.SetUserIngredients(session, "user_one", ["ingredient_one", "ingredient_two", "ingredient_six"])
user_ingredients = view.GetUserIngredients(session, "user_one")
print(len(user_ingredients) == 3)
print("Reset/Get users ingredients test")
view.SetUserIngredients(session, "user_one", ["ingredient_one", "ingredient_four"])
user_ingredients = view.GetUserIngredients(session, "user_one")
print(len(user_ingredients) == 2)

#recipe get tests
print("\n\nRECIPE INGREDIENT TESTS\n")
print("Get recipe by ingredients test")
recipes_with_ingredients = view.GetRecipes(session, ["ingredient_three", "ingredient_four"], None, None)
print(len(recipes_with_ingredients) == 1)
print("Get multiple recipes by ingredients test")
recipes_with_ingredients = view.GetRecipes(session, ["ingredient_three","ingredient_four","ingredient_five"], None, None)
print(len(recipes_with_ingredients) == 2)
print("Get no recipes by ingredients test")
recipes_with_ingredients = view.GetRecipes(session, ["ingredient_one"], None, None)
print(len(recipes_with_ingredients) == 0)

print("Get recipe by meal type test")
recipes_with_ingredients = view.GetRecipes(session, ["ingredient_three","ingredient_four","ingredient_five"], "MealType_two", None)
print(len(recipes_with_ingredients) == 1)

print("Get recipe by completion time test")
recipes_with_ingredients = view.GetRecipes(session, ["ingredient_one", "ingredient_two", "ingredient_three","ingredient_four","ingredient_five"], None, 2)
print(len(recipes_with_ingredients) == 3)

print("Get recipe by all criteria test")
recipes_with_ingredients = view.GetRecipes(session, ["ingredient_one", "ingredient_two", "ingredient_three","ingredient_four"], "MealType_one", 1)
print(len(recipes_with_ingredients) == 1)

print("\nMEAL TYPES TEST")
meal_types = view.GetMealTypes(session)
print(len(meal_types) == 2)