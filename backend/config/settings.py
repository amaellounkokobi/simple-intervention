"""
This module allow you to configure
main aspects of the app an variables

- Database

"""
from os import environ 

# Setup the config class 
print(environ.get('DB_URL'))
settings = {
    # Database Config SQL Alchemy
    'SQLALCHEMY_DATABASE_URI' : environ.get('DB_URL'),
    'SQLALCHEMY_TRACK_MODIFICATIONS' : True,
}
    
    

