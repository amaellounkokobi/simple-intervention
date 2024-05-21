"""
This module is responsible of instanciating
a Flask app it will allow us to creat a modula architecture
and different instance of the app
"""
from flask import Flask
from flask_cors import CORS
from config.extension import db
from models.collaborator import *
from models.intervention import *
from models.location import *

from API.collaborator import collaboratorApi
from API.intervention import interventionApi
from API.location import locationApi

app = Flask(__name__)

CORS(app, origins=["http://localhost:8080","http://localhost"])

app.register_blueprint(collaboratorApi, url_prefix='/api')
app.register_blueprint(interventionApi, url_prefix='/api')
app.register_blueprint(locationApi, url_prefix='/api')

db.create_all()

if __name__ == "__main__":
    app.run( host='0.0.0.0', port=5000, debug=True)