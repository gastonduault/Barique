from flask import Blueprint, jsonify, request
from ..models import Ami, db

bp = Blueprint('amis', __name__, url_prefix='/amis')

@bp.route('', methods=['POST'])
def add_ami():
    data = request.get_json()
    new_ami = Ami(
        utilisateur_id=data.get('utilisateur_id'),
        ami_id=data.get('ami_id')
    )
    try:
        db.session.add(new_ami)
        db.session.commit()
        return jsonify({'message': 'Ami ajouté avec succès!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erreur lors de l\'ajout de l\'ami', 'error': str(e)}), 500
    finally:
        db.session.close()

@bp.route('/<int:ami_id>', methods=['DELETE'])
def delete_ami(ami_id):
    ami = Ami.query.get(ami_id)
    if not ami:
        return jsonify({'message': 'Ami non trouvé'}), 404
    try:
        db.session.delete(ami)
        db.session.commit()
        return jsonify({'message': 'Ami supprimé avec succès!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Erreur lors de la suppression de l\'ami : {str(e)}'}), 500
    finally:
        db.session.close()
