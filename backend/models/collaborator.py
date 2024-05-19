# coding=utf-8
"""
Collaborator Model

"""
from . import db
from datetime import datetime

class Collaborator(db.Model):
    """
    Creation of the intervention model
    """
    __tablename__ = 'collaborators'

    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(128), nullable=False)
    date_crea = db.Column(db.DateTime, default=datetime.now())
    job = db.Column(db.String(128), nullable=False)

