from DB_Engine import session
import Data_Access as access

access.CreateUser(session, {"username": "user_one", "password": "password_one"})
access.CreateUser(session, {"username": "user_two", "password": "password_two"})

access.CreateIngredient(session, {"name": "ingredient_one"})
access.CreateIngredient(session, {"name": "ingredient_two"})
access.CreateIngredient(session, {"name": "ingredient_three"})
access.CreateIngredient(session, {"name": "ingredient_four"})

access.CreateRecipe(session, {
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
access.CreateRecipe(session, {
	"RecipeName":"recipe_two",
	"Ingredients": [
		"ingredient_three",
		"ingredient_four"
	],
	"steps":"instructions",
	"MealType":"MealType_two",
	"PrepTime":1,
})
access.CreateRecipe(session, {
	"RecipeName":"recipe_three",
	"Ingredients": [
		"ingredient_four",
		"ingredient_five"
	],
	"steps":"instructions",
	"MealType":"MealType_one",
	"PrepTime":3,
})
access.CreateRecipe(session, {
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



#create user fails tests
print("\n\nCEATE USER TESTS\n")

print("\nSuccessful create user test")
print("username" in access.CreateUser(session, {
    "username": "user_three",
    "password": "password"
}))

print("Poor format 'username' create user test")
errormessage = access.CreateUser(session, {
    "user_name": "user_three",
    "password": "password"
})
print("Error" in errormessage)

print("\nPoor format 'password' create user test")
errormessage = access.CreateUser(session, {
    "username": "user_three",
    "pass_word": "password"
})
print("Error" in errormessage)

print("\nUser create fail test")
print("Error" in access.CreateUser(session, {
    "username": "user_three",
    "password": "password"
}))

#login tests
print("\n\nLOGIN TESTS\n")

print("Login Pass Test")
validation = access.Login(session, {"username":"user_one", "password":"password_one"})
print(validation)
print(validation == True)

print("Login Fail Test")
print(access.Login(session, {"username":"user_two", "password":"password_one"}) == False)

#ingredient get tests
print("\n\nINGREDIENT GET TESTS\n")

print("Get all ingredients test")
all_ingredients = access.GetAllIngredients(session)
print(len(all_ingredients) == 5)

#ingredient get tests
print("\n\nUSER INGREDIENT TESTS\n")
print("Get users ingredients test")
user_ingredients = access.GetUserIngredients(session, {"username": "user_one"})
print(len(user_ingredients) == 0)
print("Reset/Get users ingredients test")
access.GetRecipes(session, {"username":"user_one", "Ingredients":["ingredient_one", "ingredient_four"]})
user_ingredients = access.GetUserIngredients(session, {"username":"user_one"})
print(len(user_ingredients) == 2)

print("Overwrite/Get users ingredients test")
access.GetRecipes(session, {"username":"user_one", "Ingredients":["ingredient_three"]})
user_ingredients = access.GetUserIngredients(session, {"username":"user_one"})
print(len(user_ingredients) == 1)


#recipe get tests
print("\n\nRECIPE INGREDIENT TESTS\n")
print("Get recipe by ingredients test")
recipes_with_ingredients = access.GetRecipes(session, {"Ingredients": ["ingredient_three", "ingredient_four"]})
print(len(recipes_with_ingredients) == 1)
print("Get multiple recipes by ingredients test")
recipes_with_ingredients = access.GetRecipes(session, {"Ingredients":["ingredient_three","ingredient_four","ingredient_five"]})
print(len(recipes_with_ingredients) == 2)
print("Get no recipes by ingredients test")
recipes_with_ingredients = access.GetRecipes(session, {"Ingredients":["ingredient_one"]})
print(len(recipes_with_ingredients) == 0)

print("Get recipe by meal type test")
recipes_with_ingredients = access.GetRecipes(session, {
	"Ingredients": ["ingredient_three","ingredient_four","ingredient_five"],
	"MealType": "MealType_two"
	})
print(len(recipes_with_ingredients) == 1)

print("Get recipe by completion time test")
recipes_with_ingredients = access.GetRecipes(session, {
	"Ingredients": ["ingredient_one", "ingredient_two", "ingredient_three","ingredient_four","ingredient_five"],
	"MaxPrepTime": 2
	})
print(len(recipes_with_ingredients) == 3)

print("Get recipe by all criteria test")
recipes_with_ingredients = access.GetRecipes(session, {
	"Ingredients": ["ingredient_one", "ingredient_two", "ingredient_three","ingredient_four"],
	"MealType": "MealType_one",
	"MaxPrepTime": 1
	})
print(len(recipes_with_ingredients) == 1)

print("\nMEAL TYPES TEST")
MealTypes = access.GetMealTypes(session)
print(len(MealTypes) == 2)
