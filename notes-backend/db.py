

from sqlalchemy.ext.automap import automap_base
from db_connection import ConnectDB
from sqlalchemy.orm import Session
from sqlalchemy import Column, Integer, String
from config import config

Base = automap_base()

engine = ConnectDB.createEngine(config)

class User(Base): 
    __tablename__ = 'user-credentials-data' 
    __table_args__ = {'extend_existing': 'True'} 
    user_id = Column(Integer, primary_key=True)
    user_name = Column(String)
    user_pass = Column(String)

class Notes(Base): 
    __tablename__ = 'notes-data' 
    __table_args__ = {'extend_existing': 'True'} 
    user_id = Column(Integer)
    note_id = Column(Integer, primary_key=True)
    note_title = Column(String)
    note_desc = Column(String)
    note_color = Column(String, default=None)
    note_status = Column(String, default='Active')


Base.prepare()


session = ConnectDB.makeSession(engine)