import sqlalchemy as db
from sqlalchemy import Table, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

from DB_Engine import engine

Base = declarative_base(engine)

user_ingredient_table = Table('user_ingredient', Base.metadata,
	Column('user_id', String, ForeignKey('user.username')),
	Column('ingredient_id', String, ForeignKey('ingredient.name'))
	)

recipe_ingredient_table = Table('recipe_ingredient', Base.metadata,
	Column('recipe_id', String, ForeignKey('recipe.name')),
	Column('ingredient_id', String, ForeignKey('ingredient.name'))
	)

#create the models for the tables

class Ingredient(Base):
	__tablename__ = 'ingredient'
	name = Column(String, primary_key=True)

	def to_str(self):
		return self.name

class User(Base):
	__tablename__ = 'user'
	username = Column(String, primary_key=True)
	password = Column(String)
	pantry = relationship("Ingredient", secondary=user_ingredient_table)

	def to_dict(self):
		return {
			"username":self.username,
			"password":self.password
		}

class Step(Base):
	__tablename__ = 'step'
	id = Column(Integer, primary_key=True)
	instructions = Column(String)
	order = Column(Integer)
	Recipe = Column(String, ForeignKey('recipe.name'))

	def to_dict(self):
		return {
			"Step": self.instructions,
			"Order": self.order
		}

	def to_str(self):
		return self.instructions

class Recipe(Base):
	__tablename__ = 'recipe'
	name = Column(String, primary_key=True)
	MealType = Column(String)
	PrepTime = Column(Integer)
	Ingredients = relationship("Ingredient", secondary=recipe_ingredient_table)
	Steps = relationship("Step")

	def to_dict(self):
		toReturn = {
			"RecipeName":self.name,
			"MealType":self.MealType,
			"PrepTime":self.PrepTime
		}
		ingredientsList = []
		for ingredient in self.Ingredients:
			ingredientsList.append(ingredient.to_str())
		toReturn["Ingredients"] = ingredientsList
		stepsList = []
		for step in self.Steps:
			stepsList.append(step.to_str())
		toReturn["Steps"] = stepsList
		return toReturn

	def searchresult_dict(self):
		return {
			"recipeName":self.name,
			"mealType":self.MealType,
			"prepTime":self.PrepTime
		}

#Create the tables in the db
base_metadata = Base.metadata
base_metadata.create_all(engine)
