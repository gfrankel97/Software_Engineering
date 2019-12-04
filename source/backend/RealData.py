from DB_Engine import session
import Data_Access as access
import csv
import pprint

def FormatString(stringToFormat):
    toReturn = stringToFormat.strip()
    toReturn = toReturn.strip("'")
    return toReturn


with open('recipes.csv', 'r') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter =',')
    firstline = True
    for line in csv_reader:
        if firstline:
            firstline = False
            continue
        recipeName = FormatString(line[0])
        if recipeName is None or recipeName.isspace() or not recipeName or recipeName == "":
            continue
        #print("GETTING RECIPE: " + recipeName)
        ingredients = []
        i = 4
        while (i<59):
        #for (i = 4, i < 59, i = i + 3):
            ingredient = line[i]
            i += 3
            if ingredient is None or ingredient.isspace() or not ingredient or ingredient == "":
                continue
            ingredients.append(FormatString(ingredient))
        mealType = FormatString(line[59])
        #print(mealType)
        if mealType is None or mealType.isspace() or not mealType or mealType == "":
            mealType = "Dinner"
        currentPrepTime = 0
        if mealType == "Cakes":
            currentPrepTime = 200
        elif mealType == "Cookies":
            currentPrepTime = 25
        elif mealType == "Pies":
            currentPrepTime = 300
        elif mealType == "Salads and Dressings":
            currentPrepTime = 45
        elif mealType == "Soup":
            currentPrepTime = 30
        else:
            currentPrepTime = 90
        stepsSTR = FormatString(line[1])
        stepsSTR = stepsSTR.split("\n")
        steps = []
        for stepSTR in stepsSTR:
            stepSTR = FormatString(stepSTR)
            if stepSTR is None or stepSTR.isspace() or not stepSTR or stepSTR == "":
                continue
            steps.append(stepSTR)
        recipe = {
            "RecipeName": recipeName,
            "MealType": mealType,
            "PrepTime": currentPrepTime,
            "Ingredients": ingredients,
            "Steps" : steps
        }
        #for item in recipe.items():
        #    print("key: " + item[0] + " valuetype: " + str(type(item[1])))
        #print("ADDING RECIPE: " + recipeName)
        access.CreateRecipe(session, recipe)




#pp = pprint.PrettyPrinter(indent=4)
#print("Data")
#print("GetAllMealTypes:")
#print(access.GetMealTypes(session))
#print("GetAllIngredients:")
#ingredients = access.GetAllIngredients(session)
#print(ingredients)
#recipes = access.GetRecipes(session, {
#	"Ingredients": ingredients
#})
#print("Get All RecipeResults:")
#pp.pprint(recipes)
#print("\n\nEach Recipe Obj:")
#for recipe in recipes:
#	print("\nGet by " + recipe["RecipeName"] + ":")
#	pp.pprint(access.GetRecipe(session, {"RecipeName": recipe["RecipeName"]}))
