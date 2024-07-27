from flask import Blueprint, jsonify, request
from ..models import Utilisateur, db

bp = Blueprint('utilisateurs', __name__, url_prefix='/utilisateurs')

@bp.route('', methods=['POST'])
def add_or_update_utilisateur():
    data = request.get_json()
    utilisateur = Utilisateur.query.filter_by(account_id=data.get('account_id')).first()
    if utilisateur:
        utilisateur.nom = data.get('nom', utilisateur.nom)
        utilisateur.email = data.get('email', utilisateur.email)
        utilisateur.profile_picture = data.get('profile_picture', utilisateur.profile_picture)
    else:
        utilisateur = Utilisateur(
            account_id=data.get('account_id'),
            nom=data.get('nom'),
            email=data.get('email'),
            profile_picture=data.get('profile_picture')
        )
        db.session.add(utilisateur)
    try:
        db.session.commit()
        return jsonify({
            'message': 'Utilisateur ajouté/mis à jour avec succès!',
            'uid': utilisateur.uid,
            'nom': utilisateur.nom,
            'email': utilisateur.email,
            'profile_picture': utilisateur.profile_picture
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erreur lors de l\'ajout/mise à jour de l\'utilisateur', 'error': str(e)}), 500
    finally:
        db.session.close()

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    utilisateur = Utilisateur.query.filter_by(uid=data.get('uid')).first()
    if utilisateur:
        return jsonify({
            'uid': utilisateur.uid,
            'nom': utilisateur.nom,
            'email': utilisateur.email,
            'profile_picture': utilisateur.profile_picture
        }), 200
    else:
        return jsonify({'message': 'Utilisateur non trouvé'}), 404
