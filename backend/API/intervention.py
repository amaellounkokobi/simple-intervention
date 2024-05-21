"""
API methods Interventions
"""
from flask import Blueprint, request, jsonify
from . import db
from models.intervention import Intervention
from datetime import datetime
from .serializers.intervetion import InterventionSchema

# Declare Blueprint
interventionApi = Blueprint('intervention', __name__)

# Declare Serializer
intervention_serializer = InterventionSchema()

@interventionApi.route('/interventions/', methods=['GET','POST'])
def interventions():
    """
    POST : Add a new intervention
    GET : Get all interventions
    """
    # Get all interventions
    if request.method == 'GET':
        interventions = Intervention.query.all()
        result = intervention_serializer.dump(interventions, many=True)
        return jsonify({'interventions' : result})

    # Add a new intervention
    if request.method == 'POST':
        data = request.json
        new_intervention = Intervention(title=data['title'],
                                        description=data['description'],
                                        date_crea=datetime.now(),
                                        date_start=data['date_start'],
                                        date_end=data['date_end'],
                                        status=data['status'],
                                        collaborator=data['collaborator'],
                                        location=data['location'])
        #collaborator_id=data['collaborator_id'],
        #location_id=data['location_id'])
        try:
            db.session.add(new_intervention)
            db.session.commit()
            result = intervention_serializer.dump(new_intervention, many=False)
            return jsonify(result), 201
        except:
            print("A DB error occured")
            return jsonify({'message' : "A DB error occured"}), 201


@interventionApi.route('/intervention/<int:id>', methods=['GET','PUT','DELETE'])
def intervention(id):
    """
    PUT : Edit an intervention
    DELETE : Delete an intervention
    GET : Get a single intervention
    """
    # Get a single intervention
    if request.method == 'GET':
        inter = Intervention.query.get_or_404(id)
        result = intervention_serializer.dump(inter, many=False)

        return jsonify(result)

    # Edit an intervention
    if request.method == 'PUT':
        inter = Intervention.query.get_or_404(id)
        data = request.json        
        inter.title = data['title'] 
        inter.description = data['description'] 
        inter.date_start = data['date_start']
        inter.date_end = data['date_end']
        inter.status = data['status']
        inter.collaborator = data['collaborator']
        inter.location = data['location']
        #inter.collaborator_id = data['collaborator_id']
        #inter.location_id = data['location_id']
        
        db.session.commit()
        result = intervention_serializer.dump(inter, many=False)

        return jsonify(result), 201

    # Delete an intervention
    if request.method == 'DELETE':
        inter = Intervention.query.get_or_404(id)

        db.session.delete(inter)
        db.session.commit()

        return jsonify({'message':'Deleted with success'}), 201

