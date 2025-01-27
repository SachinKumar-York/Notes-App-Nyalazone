

from app import app
from routes import *
from config import config
import psycopg2

def connect(config):
    try:
        with psycopg2.connect(**config) as conn:
            print('Connected to the PostgreSQL server.')
            return conn
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)

if __name__ == "__main__":
    conn = connect(config)
    print(conn)
    app.run(port=8080, debug=True)
