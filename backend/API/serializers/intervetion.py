from API.serializers.collaborator import CollaboratorSchema
from API.serializers.location import LocationSchema
from marshmallow import Schema, fields

class InterventionSchema(Schema):
    id = fields.Integer()
    title = fields.String()
    description = fields.String()
    date_crea = fields.DateTime()
    date_start = fields.DateTime()
    date_end = fields.DateTime()
    status = fields.Integer()
    collaborator = fields.String()
    location = fields.String()
    #collaborator = fields.Nested(CollaboratorSchema)
    #location = fields.Nested(LocationSchema)
