from flask import Blueprint, jsonify, request
from ..models import Bouteille, Historique, db
from datetime import datetime

bp = Blueprint('bouteilles', __name__, url_prefix='/bouteilles')

@bp.route('', methods=['POST'])
def add_bouteille():
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
        return jsonify({'message': 'Bouteille ajoutée avec succès!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erreur lors de l\'ajout de la bouteille', 'error': str(e)}), 500
    finally:
        db.session.close()

@bp.route('/<int:bouteille_id>', methods=['POST'])
def update_bouteille(bouteille_id):
    data = request.get_json()
    bouteille = Bouteille.query.get(bouteille_id)
    if not bouteille:
        return jsonify({'message': 'Bouteille non trouvée'}), 404
    try:
        bouteille.nom = data.get('nom', bouteille.nom)
        bouteille.region = data.get('region', bouteille.region)
        bouteille.cepage = data.get('cepage', bouteille.cepage)
        bouteille.millesime = data.get('millesime', bouteille.millesime)
        bouteille.categorie = data.get('categorie', bouteille.categorie)
        bouteille.score = data.get('score', bouteille.score)
        bouteille.notice = data.get('notice', bouteille.notice)
        db.session.commit()
        return jsonify({'message': 'Bouteille mise à jour avec succès!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Erreur lors de la mise à jour de la bouteille : {str(e)}'}), 500
    finally:
        db.session.close()

@bp.route('drunk/<int:bouteille_id>', methods=['POST'])
def delete_bouteille(bouteille_id):
    data = request.get_json()
    bouteille = Bouteille.query.get(bouteille_id)
    if not bouteille:
        return jsonify({'message': 'Bouteille non trouvée'}), 404
    try:
        historique = Historique(
            nom=bouteille.nom,
            region=bouteille.region,
            cepage=bouteille.cepage,
            millesime=bouteille.millesime,
            categorie=bouteille.categorie,
            cave_id=bouteille.cave_id,
            date_suppression=data.get('date_suppression'),
            score=bouteille.score,
            notice=bouteille.notice
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



@bp.route('/cave/<int:cave_id>', methods=['GET'])
def get_bouteilles_by_cave(cave_id):
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
