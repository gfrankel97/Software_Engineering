import sqlalchemy as db
from sqlalchemy.orm import sessionmaker

engine = db.create_engine('sqlite:///Pantry2Table.db',connect_args={'check_same_thread': False})

SessionBase = sessionmaker(bind=engine, autoflush=False)
session = SessionBase() 