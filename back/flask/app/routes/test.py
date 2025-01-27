from flask import Blueprint, jsonify, request
from ..models import Bouteille, Historique, db
from datetime import datetime

bp = Blueprint('test', __name__, url_prefix='/test')

@bp.route('', methods=['GET'])
def test(cave_id):
    return "test", 200


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
