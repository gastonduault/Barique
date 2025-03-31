from flask import Blueprint, jsonify, request
from ..models import Bouteille, Historique, db
from datetime import datetime
from ..middlewares.auth_middleware import verify_token



bp = Blueprint('bottles', __name__)


@bp.route('', methods=['POST'])
def add_bottle():
    decoded_token, error_response = verify_token()
    if error_response:
        return error_response
    data = request.get_json()
    new_bouteille = Bouteille(
        nom=data.get('nom'),
        region=data.get('region'),
        cepage=data.get('cepage'),
        millesime=data.get('millesime'),
        categorie=data.get('categorie'),
        cave_id=data.get('cave_id'),
        score=data.get('score'),
        notice=data.get('notice')
    )
    try:
        db.session.add(new_bouteille)
        db.session.commit()
        return jsonify({'message': 'Bottle added successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erreur lors de l\'ajout de la bouteille', 'error': str(e)}), 500
    finally:
        db.session.close()


@bp.route('/<int:bottle_id>', methods=['POST'])
def update_bottle(bottle_id):
    decoded_token, error_response = verify_token()
    if error_response:
        return error_response
    data = request.get_json()
    bottle = Bouteille.query.get(bottle_id)
    if not bottle:
        return jsonify({'message': 'Bottle not found'}), 404
    try:
        bottle.nom = data.get('nom', bottle.nom)
        bottle.region = data.get('region', bottle.region)
        bottle.cepage = data.get('cepage', bottle.cepage)
        bottle.millesime = data.get('millesime', bottle.millesime)
        bottle.categorie = data.get('categorie', bottle.categorie)
        bottle.score = data.get('score', bottle.score)
        bottle.notice = data.get('notice', bottle.notice)
        db.session.commit()
        return jsonify({'message': 'Bouteille mise à jour avec succès!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Erreur lors de la mise à jour de la bouteille : {str(e)}'}), 500
    finally:
        db.session.close()


@bp.route('drunk/<int:bouteille_id>', methods=['POST'])
def delete_bouteille(bouteille_id):
    decoded_token, error_response = verify_token()
    if error_response:
        return error_response
    data = request.get_json()
    bouteille = Bouteille.query.get(bouteille_id)
    if not bouteille:
        return jsonify({'message': 'Bouteille non trouvée'}), 404
    try:
        historique = Historique(
            nom=data.get('nom'),
            region=data.get('region'),
            cepage=data.get('cepage'),
            millesime=data.get('millesime'),
            categorie=data.get('categorie'),
            cave_id=data.get('cave_id'),
            date_suppression=data.get('date_suppression'),
            score=data.get('score'),
            notice=data.get('notice')
        )
        db.session.add(historique)
        db.session.delete(bouteille)
        db.session.commit()

        return jsonify({'message': 'Bouteille supprimée avec succès et ajoutée à l\'historique avec son avis!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Erreur lors de la suppression de la bouteille : {str(e)}'}), 500
    finally:
        db.session.close()


@bp.route('/cellars/<int:cave_id>', methods=['GET'])
def get_bottles_by_cellar(cave_id):
    decoded_token, error_response = verify_token()
    if error_response:
        return error_response
    bouteilles = Bouteille.query.filter_by(cave_id=cave_id).all()
    return jsonify([bouteille.to_dict() for bouteille in bouteilles]), 200


def to_dict(self):
    return {
        'id': self.id,
        'nom': self.nom,
        'region': self.region,
        'cepage': self.cepage,
        'millesime': self.millesime,
        'categorie': self.categorie,
        'cave_id': self.cave_id,
        'score': self.score,
        'notice': self.notice
    }

Bouteille.to_dict = to_dict
