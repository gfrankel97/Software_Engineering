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

class Recipe(Base):
	__tablename__ = 'recipe'
	name = Column(String, primary_key=True)
	description = Column(String)
	instructions = Column(String)
	picture = Column(String)
	mealtype = Column(String)
	servingsize = Column(Integer)
	timetocompletion = Column(Integer)
	ingredients = relationship("Ingredient", secondary=recipe_ingredient_table)
	
	def to_dict(self):
		toReturn = {
			"name":self.name,
			"description":self.description,
			"steps":self.instructions,
			"picture":self.picture,
			"mealtype":self.mealtype,
			"servingsize":self.servingsize,
			"prepTime":self.timetocompletion
		}
		ingredientsList = []
		for ingredient in self.ingredients:
			ingredientsList.append(ingredient.to_str())
		toReturn["ingredients"] = ingredientsList
		return toReturn

#Create the tables in the db
base_metadata = Base.metadata
base_metadata.create_all(engine)
