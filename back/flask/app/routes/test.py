from flask import Blueprint, jsonify, request
from ..models import Bouteille, Historique, db
from datetime import datetime

bp = Blueprint('test', __name__, url_prefix='/test')

@bp.route('', methods=['GET'])
def test():
    return jsonify({'test': 'ok'})
