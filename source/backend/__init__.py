import os

from flask import Flask, render_template, send_from_directory
from flask_cors import CORS, cross_origin

import Data_Access as access


app = Flask(__name__)
CORS(app)


#serve static files
@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(os.path.abspath('/app/backend/templates/html'), path)


@app.route('/')
def app_entrypoint():
    return render_template('app.jinja2')

@app.route('/GetAllIngredients')
def app_entrypoint():
    return access.GetAllIngredients(session)

@app.route('/GetAllMealTypes')
def app_entrypoint():
    return access.GetMealTypes(session)

@app.route('/GetRecipeByFilter')
def app_entrypoint():
    return access.GetRecipes(session, request)

@app.route('/GetRecipeById')
def app_entrypoint():
    return access.GetRecipe(session, request)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)