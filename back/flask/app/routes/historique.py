from flask import Blueprint, jsonify, request
from ..models import Bouteille, Historique, Cave, db
from ..auth_middleware import verify_token

bp = Blueprint('historique', __name__, url_prefix='/historique')

# @bp.route('/<int:cave_id>', methods=['GET'])
# def get_historique_by_cave(cave_id):
#     decoded_token, error_response = verify_token()
#     if error_response:
#         return error_response
#     bouteilles = Historique.query.filter_by(cave_id=cave_id).order_by(Historique.date_suppression.desc()).all()
#     return jsonify([bouteille.to_dict() for bouteille in bouteilles]), 200
#

@bp.route('', methods=['GET'])
def get_historique_by_user():
    decoded_token, error_response = verify_token()
    if error_response:
        return error_response

    uid = decoded_token.get('uid')
    caves = Cave.query.filter_by(proprietaire_uid=uid).all()
    cave_ids = [cave.id for cave in caves]

    if not cave_ids:
        return jsonify({'message': 'No cellar found for this user'}), 404

    bouteilles = Historique.query.filter(Historique.cave_id.in_(cave_ids)) \
        .order_by(Historique.date_suppression.desc()).all()

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
        'notice': self.notice,
        'date_suppression': self.date_suppression
    }

Historique.to_dict = to_dict


@bp.route('/<int:bouteille_id>', methods=['POST'])
def update_bouteille(bouteille_id):
    decoded_token, error_response = verify_token()
    if error_response:
        return error_response
    data = request.get_json()
    bouteille = Historique.query.get(bouteille_id)
    if not bouteille:
        return jsonify({'message': 'Bouteille non trouvée'}), 404
    try:
        bouteille.score = data.get('score', bouteille.score)
        bouteille.notice = data.get('notice', bouteille.notice)
        db.session.commit()
        return jsonify({'message': 'Bouteille mise à jour avec succès!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Erreur lors de la mise à jour de la bouteille : {str(e)}'}), 500
    finally:
        db.session.close()