import sqlalchemy as db
from sqlalchemy.orm import sessionmaker

engine = db.create_engine('sqlite:///Pantry2Table.db')

SessionBase = sessionmaker(bind=engine, autoflush=False)
session = SessionBase() 