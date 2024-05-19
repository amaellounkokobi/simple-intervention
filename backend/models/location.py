# coding=utf-8
"""
Location Model

"""
from . import db
from datetime import datetime

class Location(db.Model):
    """
    Creation of the intervention model
    """
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, default=datetime.now())

