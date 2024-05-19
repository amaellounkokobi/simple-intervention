# coding=utf-8
"""
Intervention Model

"""
from . import db
from datetime import datetime


class Intervention(db.Model):
    """
    Creation of the intervention model
    """
    __tablename__ = 'interventions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(140))
    description = db.Column(db.String(255))
    date_crea = db.Column(db.DateTime, default=datetime.now())
    date_start = db.Column(db.DateTime, nullable=False)
    date_end = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Integer, default=0, nullable=False)
    collaborator = db.Column(db.String(140))
    location = db.Column(db.String(140))
    #collaborator_id = db.Column(db.Integer, db.ForeignKey('collaborators.id'))
    #collaborator = db.relationship('Collaborator', backref='interventions')
    #location_id = db.Column(db.Integer, db.ForeignKey('locations.id'))
    #location = db.relationship('Location', backref='interventions')

