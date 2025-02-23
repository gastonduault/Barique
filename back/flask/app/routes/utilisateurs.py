from flask import Blueprint, jsonify, request
from firebase_admin import auth
from ..models import Utilisateur, db
from ..auth_middleware import verify_token

bp = Blueprint('utilisateurs', __name__, url_prefix='/utilisateurs')

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

    return jsonify({
        'message': 'Authentication succeeded!',
        'uid': utilisateur.uid,
        'nom': utilisateur.nom,
        'email': utilisateur.email,
        'profile_picture': utilisateur.profile_picture
    }), 200
