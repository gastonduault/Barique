from flask import Blueprint, jsonify, request
from ..models import Bouteille, Historique, db


bp = Blueprint('test', __name__)


@bp.route('', methods=['GET'])
def test():
    return jsonify({'test': 'ok'})
