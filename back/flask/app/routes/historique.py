from flask import Blueprint, jsonify, request
from ..models import Bouteille, Historique, db

bp = Blueprint('bouteilles', __name__, url_prefix='/historique')

@bp.route('', methods=['GET'])
def get_historique_by_cave(cave_id):
    bouteilles = Bouteille.query.filter_by(cave_id=cave_id).all()
    return jsonify([bouteille.to_dict() for bouteille in bouteilles]), 200