"""
API methods locations
"""
from flask import Blueprint, request, jsonify
from . import db
from models.location import Location
from .serializers.location import LocationSchema

# Declare Blueprint
locationApi = Blueprint('location', __name__)

# Declare Serializer
location_serializer = LocationSchema()

@locationApi.route('/locations/', methods=['GET','POST'])
def locations():
    """ 
    POST : Add a new location
    GET : Get all locations
    """
    # Get all locations
    if request.method == 'GET':
        locations = Location.query.all()
        result = location_serializer.dump(locations, many=True)
        
        return jsonify({'locations' :result}), 201
    
    # Add a new location
    if request.method == 'POST':
        data = request.json
        new_location = Location(name=data['name'],
                                lat=data['lat'],
                                lng=data['lng'])
        
        db.session.add(new_location)
        db.session.commit()

        return jsonify({'message':'added with success'}), 201
    
    
@locationApi.route('/location/<int:id>', methods=['GET','PUT','DELETE'])
def location(id):
    """
    PUT : Edit an location
    DELETE : Delete an location
    GET : Get a single location
    """

    # Get a single location
    if request.method == 'GET':
        loca = Location.query.get_or_404(id)
        result = location_serializer.dump(loca, many=False)

        return jsonify(result)
    
    # Edit an location
    if request.method == 'PUT':
        loca = Location.query.get_or_404(id)
        data = request.json        
        loca.name = data['name'] 
        loca.lat = data['lat'] 
        loca.lng = data['lng']
        
        db.session.commit()

        return jsonify({'message':'Updated with success'}), 201

    # Delete an location
    if request.method == 'DELETE':
        loca = Location.query.get_or_404(id)

        db.session.delete(loca)
        db.session.commit()

        return jsonify({'message':'Deleted with success'}), 201

