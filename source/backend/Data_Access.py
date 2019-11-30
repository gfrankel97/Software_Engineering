from Models import User, Recipe, Ingredient
import Views as view

#All requests are dictionaries
#If a request has required or optional fields,
#these are listed at the top of the function as dictionaries - requiredfields and optionalfields
#key - the expected key in the request dictionary
#value - the expected value type corresponding to the key in the request dictionary
#If fields are optional they still must follow their provided type in th optionalfields dictionary

#If an error occurs during any request, the error is returned

#Validation
#Check that a request has the appropriate request format
def CheckRequestFormat(request, requiredFields, optionalFields):
    if requiredFields is not None:
        for field in requiredFields.items():
            if field[0] not in request:
                return False
            elif type(request[field[0]]) is not field[1]:
                return False
    if optionalFields is not None:
        for field in optionalFields.items():
            if field[0] in request and type(request[field[0]]) is not field[1]:
                return False
    return True

#Validation failed error message
#Create an error message for a misformated request
def FormatErrorMessage(requiredFields, optionalFields):
    formaterrormessage = "Unexpected format! Expected:"
    if requiredFields is not None:
        formaterrormessage += "\nRequired:"
        for field in requiredFields.items():
            formaterrormessage += "\n" + field[0] + " as " + field[1].__name__
    if optionalFields is not None:
        formaterrormessage += "\nOptional:"
        for field in optionalFields.items():
            formaterrormessage += "\n" + field[0] + " as " + field[1].__name__
    return formaterrormessage

#Create User
#Create a user and add it to the User table
#output - User Model dict
def CreateUser(session, request):
    requiredfields = {
        "username":str, #user's username
        "password":str #user's password
    }
    if not CheckRequestFormat(request, requiredfields, None):
        return {"Error": FormatErrorMessage(requiredfields, None)}
    user = view.CreateUser(session, request["username"], request["password"])
    return user.to_dict() if not isinstance(user, str) else {"Error": user} 
    
#Create Ingredient
#Create an ingredient and add it to the Ingredient table
#output - ingredient's name - string
def CreateIngredient(session, request):
    requiredfields = {
        "name": str #the name of the ingredient
    }
    if not CheckRequestFormat(request, requiredfields, None):
        return {"Error": FormatErrorMessage(requiredfields, None)}
    ingredient = view.CreateIngredient(session, request["name"])
    return ingredient.to_str() if not isinstance(ingredient, str) else {"Error": ingredient} 
    
#Create Ingredients
#Creates multiple ingredients and adds them to the Ingredients table
#output  - dict
#   Ingredients     list of strings added successfully
#   Errors          dict of ingredient names and errors encountered for that name 
def CreateIngredients(session, request):
    requiredfields = {
        "names": list #list of names (strings) of ingredients
    }
    if not CheckRequestFormat(request, requiredfields, None):
        return {"Error": FormatErrorMessage(requiredfields, None)}
    return_status = {
        "Ingredients" : [],
        "Errors" : {}
    }
    for name in request["names"]:
        ingredient = view.CreateIngredient(name)
        if not isinstance(ingredient, str):
            return_status["Ingredients"].append(ingredient.to_str())
        else:
            return_status["Errors"]["name"] = ingredient
    return return_status 

#Create Recipe
#Creates a new Recipe and adds it to the Recipe Table
#Adds ingredients that don't yet exist in the Ingredient table
#Adds RecipeIngredient relationship entires in the RecipeIngredient table 
#output - new recipe - dict
def CreateRecipe(session, request):
    requiredfields = {
        "RecipeName":str,
        "Steps":list,
        "MealType":str,
        "PrepTime":int,
        "Ingredients":list,
    }
    if not CheckRequestFormat(request, requiredfields, None):
        return {"Error": FormatErrorMessage(requiredfields, None)}
    recipe = view.CreateRecipe(session, request)
    return recipe.to_dict() if not isinstance(recipe, str) else {"Error": recipe}

#Validate login credientials
#output bool - True if valid credentials
def Login(session, request):
    requiredfields = {
        "username": str,
        "password": str
    }
    if not CheckRequestFormat(request, requiredfields, None):
        return {"Error": FormatErrorMessage(requiredfields, None)}
    validation = view.Login(session, request["username"], request["password"])
    return validation if not isinstance(validation, str) else {"Error": validation}

#Get all ingredients
#output - list of ingredients (strings) 
def GetAllIngredients(session):
    return view.GetAllIngredients(session)

#Get a user's ingredients
#username - string
#output - list of strings
def GetUserIngredients(session, request):
    requiredfields = {
        "username":str
    }
    if not CheckRequestFormat(request, requiredfields, None):
        return {"Error": FormatErrorMessage(requiredfields, None)}
    return view.GetUserIngredients(session, request["username"])

#Get recipes that use only the given ingredients
#output - list of recipes (dictionaries)
def GetRecipes(session, request):
    requiredfields = {
        "Ingredients":list,
    }
    optionalfields = {
        "username":str,
        "MealType":str,
        "MaxPrepTime":int
    }
    if not CheckRequestFormat(request, requiredfields, optionalfields):
        return {"Error": FormatErrorMessage(requiredfields, optionalfields)}
    if "username" in request:
        view.SetUserIngredients(session, request["username"], request["Ingredients"])
    return view.GetRecipes(session, request["Ingredients"], \
        request["MealType"] if "MealType" in request else None, \
        request["MaxPrepTime"] if "MaxPrepTime" in request else None)

#Get recipe by name
#output - recipe (dict)
def GetRecipe(session, request):
    requiredfields = {
        "RecipeName":str,
    }
    if not CheckRequestFormat(request, requiredfields, None):
        return {"Error": FormatErrorMessage(requiredfields, None)}
    return view.GetRecipe(session, request["RecipeName"])

#Get all meal types
#output - list of meal types (strings)
def GetMealTypes(session):
    return view.GetMealTypes(session)
