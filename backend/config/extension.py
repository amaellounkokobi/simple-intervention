"""
This module ...
"""
from config.settings import settings 
from flask_sqlalchemy import SQLAlchemy
from flask import Flask


app = Flask(__name__)


# Data base init
db = SQLAlchemy(app)

app.config['SQLALCHEMY_DATABASE_URI'] = settings['SQLALCHEMY_DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = settings['SQLALCHEMY_TRACK_MODIFICATIONS']

db.init_app(app)




