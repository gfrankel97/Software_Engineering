import os

from flask import Flask, render_template, send_from_directory, request
from flask_cors import CORS, cross_origin

import Data_Access as access
import RealData
from DB_Engine import session
import pprint


app = Flask(__name__)
CORS(app)

pp = pprint.PrettyPrinter(indent=4)

def Response(response):
    return {"response": response}

#serve static files
@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(os.path.abspath('/app/backend/templates/html'), path)


@app.route('/')
def app_entrypoint():
    return render_template('app.jinja2')

@app.route('/GetAllIngredients')
def GetAllIngredients():
    return Response(access.GetAllIngredients(session))

@app.route('/GetAllMealTypes')
def GetAllMealTypes():
    return Response(access.GetMealTypes(session))

@app.route('/GetRecipeByFilter', methods=["POST"])
def GetRecipeByFilter():
    pp.pprint(request.get_json())
    toReturn = Response(access.GetRecipes(session, request.get_json()))
    pp.pprint(toReturn)
    return toReturn

@app.route('/GetRecipeById', methods=["POST"])
def GetRecipeById():
    pp.pprint(request)
    pp.pprint(request.get_json())
    toReturn = Response(access.GetRecipe(session, request.get_json()))
    pp.pprint(toReturn)
    return toReturn

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)