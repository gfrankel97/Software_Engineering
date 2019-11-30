from DB_Engine import session
import Data_Access as access


ingredientMaps = [
	[1],
	[2],
	[3],
	[4],
	[5],
	[1,2],
	[1,3],
	[1,4],
	[1,5],
	[2,3],
	[2,4],
	[2,5],
	[3,4],
	[3,5],
	[4,5],
	[1,2,3],
	[1,2,4],
	[1,2,5],
	[2,3,4],
	[2,3,5],
	[2,4,5],
	[3,4,5],
	[1,2,3,4],
	[1,2,3,5],
	[1,2,4,5],
	[1,3,4,5],
	[2,3,4,5],
	[1,2,3,4,5],
]
mealTypes = 6
maxpreptime = 10

currentMealType = 1
currentPrepTime = 1
ingredients = []
for ingredientMap in ingredientMaps:
	recipeName = "Recipe"
	recipeName += "_Type" + str(currentMealType)
	recipeName += "_Time" + str(currentPrepTime)
	recipeName += "_Ingr"
	ingredients = []
	for ingredient in ingredientMap:
		recipeName += str(ingredient)
		ingredients.append("Ingredient_" + str(ingredient))
	recipe = {
		"RecipeName": recipeName,
		"MealType": "MealType_" + str(currentMealType),
		"PrepTime": currentPrepTime,
		"Ingredients": ingredients,
		"steps" : "instructions"
	}
	access.CreateRecipe(session, recipe)
	currentMealType += 1
	if currentMealType > mealTypes:
		currentMealType = 1
	currentPrepTime += 1
	if currentPrepTime > maxpreptime:
		currentPrepTime = 1

print("Mock Test Data")
print("GetAllMealTypes:")
print(access.GetMealTypes(session))
print("GetAllIngredients:")
print(access.GetAllIngredients(session))
print("Get All Recipes:")
print(access.GetRecipes(session, {
	"Ingredients": ingredients
}))
