from flask import Blueprint, jsonify, request
from ..models import Bouteille, Historique, db

bp = Blueprint('historique', __name__, url_prefix='/historique')

@bp.route('/<int:cave_id>', methods=['GET'])
def get_historique_by_cave(cave_id):
    bouteilles = Historique.query.filter_by(cave_id=cave_id).all()
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