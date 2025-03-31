from flask import Blueprint, jsonify, request
from firebase_admin import auth
from ..models import Utilisateur, Cave, db
from ..middlewares.auth_middleware import verify_token


bp = Blueprint('login', __name__)


@bp.route('', methods=['POST'])
def authentifier_utilisateur():
    decoded_token, error_response = verify_token()
    if error_response:
        return error_response

    uid = decoded_token.get('uid')
    email = decoded_token.get('email')
    nom = decoded_token.get('name')
    profile_picture = decoded_token.get('picture')

    if not email:
        return jsonify({'message': 'Email missing'}), 400

    utilisateur = Utilisateur.query.filter_by(email=email).first()

    if utilisateur:
        utilisateur.nom = nom or utilisateur.nom
        utilisateur.profile_picture = profile_picture or utilisateur.profile_picture
    else:
        utilisateur = Utilisateur(
            uid=uid,
            email=email,
            nom=nom,
            profile_picture=profile_picture
        )
        db.session.add(utilisateur)

    db.session.commit()

    cave = Cave.query.filter_by(proprietaire_uid=utilisateur.uid).first()
    cave_infos = {}
    if cave:
        cave_infos = {'id': cave.id, 'nom': cave.nom, 'profile_picture': cave.profile_picture}

    return jsonify({
        'message': 'Authentication succeeded!',
        'uid': utilisateur.uid,
        'nom': utilisateur.nom,
        'email': utilisateur.email,
        'profile_picture': utilisateur.profile_picture,
        'cave': cave_infos
    }), 200
