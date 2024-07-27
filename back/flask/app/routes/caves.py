from flask import Blueprint, jsonify, request
from ..models import Cave, db

bp = Blueprint('caves', __name__, url_prefix='/caves')

@bp.route('', methods=['POST'])
def add_cave():
    data = request.get_json()
    new_cave = Cave(
        proprietaire_uid=data.get('proprietaire_uid'),
        nom=data.get('nom')
    )
    try:
        db.session.add(new_cave)
        db.session.commit()
        return jsonify({'message': 'Cave ajoutée avec succès!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erreur lors de l\'ajout de la cave', 'error': str(e)}), 500
    finally:
        db.session.close()

@bp.route('/owner/<int:proprietaire_uid>', methods=['GET'])
def get_caves_by_proprietaire(proprietaire_uid):
    caves = Cave.query.filter_by(proprietaire_uid=proprietaire_uid).all()
    caves_list = [{'id': cave.id, 'nom': cave.nom} for cave in caves]
    return jsonify({'caves': caves_list})
