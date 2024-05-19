"""
API methods collaborator
"""
from flask import Blueprint, request, jsonify
from . import db
from models.collaborator import Collaborator
from datetime import datetime
from .serializers.collaborator import CollaboratorSchema

# Declare Blueprint
collaboratorApi = Blueprint('collaborator', __name__)

# Declare Serializer
collaborator_serializer = CollaboratorSchema()

@collaboratorApi.route('/collaborators/', methods=['GET','POST'])
def collaborators():
    """ 
    POST : Add a new collaborator
    GET : Get all collaborators
    """
    # Get all collaborators
    if request.method == 'GET':
        collaborators = Collaborator.query.all()
        result = collaborator_serializer.dump(collaborators, many=True)
        
        return jsonify({'collaborators' :result})
    
    # Add a new collaborator
    if request.method == 'POST':
        data = request.json
        new_collaborator = Collaborator(company=data['company'],
                                        date_crea=datetime.now(),
                                        job=data['job'])
        
        db.session.add(new_collaborator)
        db.session.commit()

        return jsonify({'message':'added with success'}), 201
    
    
@collaboratorApi.route('/collaborator/<int:id>', methods=['GET','PUT','DELETE'])
def collaborator(id):
    """
    PUT : Edit an collaborator
    DELETE : Delete an collaborator
    GET : Get a single collaborator
    """
    # Get a single collaborator
    if request.method == 'GET':
        collab = Collaborator.query.get_or_404(id)
        result = collaborator_serializer.dump(collab, many=False)
        
        return jsonify(result)
    
    # Edit an collaborator
    if request.method == 'PUT':
        collab = Collaborator.query.get_or_404(id)
        data = request.json        
        collab.company = data['company'] 
        collab.date_crea = datetime.now()
        collab.job = data['job']
        
        db.session.commit()

        return jsonify({'message':'Updated with success'}), 201

    # Delete an collaborator
    if request.method == 'DELETE':
        collab = Collaborator.query.get_or_404(id)

        db.session.delete(collab)
        db.session.commit()

        return jsonify({'message':'Deleted with success'}), 201

