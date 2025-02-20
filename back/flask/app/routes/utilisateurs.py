from flask import Blueprint, jsonify, request
from ..models import Cave, Bouteille, Historique, db

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
        caves = Cave.query.filter_by(proprietaire_uid=utilisateur.uid).all()
        caves_list = [{'id': cave.id, 'nom': cave.nom, 'profile_picture': cave.profile_picture} for cave in caves]
        return jsonify({
            'message': 'Utilisateur ajouté/mis à jour avec succès!',
            'uid': utilisateur.uid,
            'nom': utilisateur.nom,
            'email': utilisateur.email,
            'profile_picture': utilisateur.profile_picture,
            'caves': caves_list
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
        caves = Cave.query.filter_by(proprietaire_uid=utilisateur.uid).all()
        caves_list = [{'id': cave.id, 'nom': cave.nom, 'profile_picture': cave.profile_picture} for cave in caves]
        return jsonify({
            'uid': utilisateur.uid,
            'nom': utilisateur.nom,
            'email': utilisateur.email,
            'profile_picture': utilisateur.profile_picture,
            'caves': caves_list
        }), 200
    else:
        return jsonify({'message': 'Utilisateur non trouvé'}), 404
