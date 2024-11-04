from flask import Blueprint, jsonify, request, current_app
import os
from ..models import Cave, Bouteille, Historique, db

bp = Blueprint('caves', __name__, url_prefix='/caves')

@bp.route('', methods=['POST'])
def add_cave():
    data = request.get_json()
    new_cave = Cave(
        profile_picture=data['profile_picture'],
        proprietaire_uid=data.get('proprietaire_uid'),
        nom=data.get('nom')
    )
    try:
        db.session.add(new_cave)
        db.session.commit()
        return jsonify({'message': 'Cave ajoutée avec succès!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erreur lors de l\'ajout de la cave', 'error': str(e)}), 500
    finally:
        db.session.close()

@bp.route('/<int:cave_id>', methods=['POST'])
def update_cave(cave_id):
    data = request.get_json()
    cave = Cave.query.get(cave_id)
    if not cave:
        return jsonify({'message': 'Cave non trouvée'}), 404
    try:
        cave.nom = data.get('nom', cave.nom)
        cave.profile_picture = data.get('profile_picture', cave.profile_picture)
        db.session.commit()
        return jsonify({'message': 'Cave mise à jour avec succès!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Erreur lors de la mise à jour de la Cave : {str(e)}'}), 500
    finally:
        db.session.close()

@bp.route('/<int:cave_id>', methods=['DELETE'])
def delete_bouteille(cave_id):
    cave = Cave.query.get(cave_id)
    if not cave:
        return jsonify({'message': 'Cave non trouvée'}), 404
    try:
        Bouteille.query.filter_by(cave_id=cave_id).delete()
        Historique.query.filter_by(cave_id=cave_id).delete()
        db.session.delete(cave)
        db.session.commit()
        return jsonify({'message': 'Couteille supprimée avec succès !'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Erreur lors de la suppression de la Cave : {str(e)}'}), 500
    finally:
        db.session.close()

@bp.route('/owner/<int:proprietaire_uid>', methods=['GET'])
def get_caves_by_proprietaire(proprietaire_uid):
    caves = Cave.query.filter_by(proprietaire_uid=proprietaire_uid).all()
    caves_list = [{'id': cave.id, 'nom': cave.nom, 'profile_picture': cave.profile_picture} for cave in caves]
    return jsonify({'caves': caves_list})


@bp.route('/images', methods=['GET'])
def get_available_images():
    upload_folder = os.path.join(current_app.root_path, 'static', 'uploads')
    images = []
    for filename in os.listdir(upload_folder):
        if filename.endswith(('.png', '.jpg', '.jpeg', '.gif')):
            images.append(f'/static/uploads/{filename}')

    return jsonify({'available_images': images}), 200
