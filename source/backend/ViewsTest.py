from DB_Engine import session
import Views as view

view.CreateUser(session, "user_one", "password_one")
view.CreateUser(session, "user_two", "password_two")

view.CreateIngredient(session, "ingredient_one")
view.CreateIngredient(session, "ingredient_two")
view.CreateIngredient(session, "ingredient_three")
view.CreateIngredient(session, "ingredient_four")

view.CreateRecipe(session, {
	"name":"recipe_one",
	"ingredients": [
		"ingredient_one",
		"ingredient_two",
		"ingredient_three"
	],
	"description":"description",
	"steps":"instructions",
	"picture":"picture",
	"mealtype":"mealtype_one",
	"servingsize":2,
	"prepTime":1,
})
view.CreateRecipe(session, {
	"name":"recipe_two",
	"ingredients": [
		"ingredient_three",
		"ingredient_four"
	],
	"description":"description",
	"steps":"instructions",
	"picture":"picture",
	"mealtype":"mealtype_two",
	"servingsize":2,
	"prepTime":1,
})
view.CreateRecipe(session, {
	"name":"recipe_three",
	"ingredients": [
		"ingredient_four",
		"ingredient_five"
	],
	"description":"description",
	"steps":"instructions",
	"picture":"picture",
	"mealtype":"mealtype_two",
	"servingsize":2,
	"prepTime":3,
})
view.CreateRecipe(session, {
	"name":"recipe_four",
	"ingredients": [
		"ingredient_one",
		"ingredient_two",
		"ingredient_three"
	],
	"description":"description",
	"steps":"instructions",
	"picture":"picture",
	"mealtype":"mealtype_one",
	"servingsize":2,
	"prepTime":2,
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
recipes_with_ingredients = view.GetRecipes(session, ["ingredient_three","ingredient_four","ingredient_five"], "mealtype_two", None)
print(len(recipes_with_ingredients) == 2)

print("Get recipe by completion time test")
recipes_with_ingredients = view.GetRecipes(session, ["ingredient_one", "ingredient_two", "ingredient_three","ingredient_four","ingredient_five"], None, 2)
print(len(recipes_with_ingredients) == 3)

print("Get recipe by all criteria test")
recipes_with_ingredients = view.GetRecipes(session, ["ingredient_one", "ingredient_two", "ingredient_three","ingredient_four"], "mealtype_one", 1)
print(len(recipes_with_ingredients) == 1)