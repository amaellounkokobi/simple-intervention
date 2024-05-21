"""
Collaborator serializer
"""
from marshmallow import Schema, fields

class CollaboratorSchema(Schema):
    id = fields.Integer()
    company = fields.String()
    date_crea = fields.DateTime()
    job = fields.String()

