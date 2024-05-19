from marshmallow import Schema, fields

class LocationSchema(Schema):
    id = fields.Integer()
    name = fields.String()
    lat = fields.Float()
    lng = fields.Float()

