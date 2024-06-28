from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import psycopg2
import config

class ConnectDB:
    @staticmethod
    def createEngine(config):
        con_string = "postgresql+psycopg2://{0}:{1}@{2}/{3}".format(config['user'], config['password'],config['host'], config['dbname'])

        return create_engine(con_string)
    
    @staticmethod
    def makeSession(engine):
        Session = sessionmaker(bind=engine)
        return Session()

if __name__ == '__main__':
    dbEngine = ConnectDB.createEngine(config)

    print(dbEngine)
