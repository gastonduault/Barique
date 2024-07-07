from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "allow_headers": "*", "methods": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://user:user@mysql/polywine'
db = SQLAlchemy(app)


class Utilisateur(db.Model):
    __tablename__ = 'utilisateurs'
    uid = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.String(50))
    nom = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    profile_picture = db.Column(db.String(50))


class Cave(db.Model):
    __tablename__ = 'caves'
    id = db.Column(db.Integer, primary_key=True)
    proprietaire_uid = db.Column(db.Integer, db.ForeignKey('utilisateurs.uid'), nullable=False)
    nom = db.Column(db.String(50), nullable=False, unique=True)


class Bouteille(db.Model):
    __tablename__ = 'bouteilles'
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(50), nullable=False)
    region = db.Column(db.String(50), nullable=False)
    cepage = db.Column(db.String(50), nullable=False)
    millesime = db.Column(db.Integer, nullable=False)
    categorie = db.Column(db.String(50), nullable=False)
    cave_id = db.Column(db.Integer, db.ForeignKey('caves.id'), nullable=False)


class Ami(db.Model):
    __tablename__ = 'amis'
    id = db.Column(db.Integer, primary_key=True)
    utilisateur_id = db.Column(db.Integer, db.ForeignKey('utilisateurs.uid'), nullable=False)
    ami_id = db.Column(db.Integer, db.ForeignKey('utilisateurs.uid'), nullable=False)

@app.route('/utilisateurs', methods=['POST'])
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


@app.route('/login', methods=['POST'])
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



@app.route('/caves', methods=['POST'])
def add_cave():
    data = request.get_json()
    new_cave = Cave(
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

@app.route('/caves/owner/<int:proprietaire_uid>', methods=['GET'])
def get_caves_by_proprietaire(proprietaire_uid):
    caves = Cave.query.filter_by(proprietaire_uid=proprietaire_uid).all()
    caves_list = [{'id': cave.id, 'nom': cave.nom} for cave in caves]
    return jsonify({'caves': caves_list})


@app.route('/bouteilles', methods=['POST'])
def add_bouteille():
    data = request.get_json()
    new_bouteille = Bouteille(
        nom=data.get('nom'),
        region=data.get('region'),
        cepage=data.get('cepage'),
        millesime=data.get('millesime'),
        categorie=data.get('categorie'),
        cave_id=data.get('cave_id')
    )
    try:
        db.session.add(new_bouteille)
        db.session.commit()
        return jsonify({'message': 'Bouteille ajoutée avec succès!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erreur lors de l\'ajout de la bouteille', 'error': str(e)}), 500
    finally:
        db.session.close()


@app.route('/amis', methods=['POST'])
def add_ami():
    data = request.get_json()
    new_ami = Ami(
        utilisateur_id=data.get('utilisateur_id'),
        ami_id=data.get('ami_id')
    )
    try:
        db.session.add(new_ami)
        db.session.commit()
        return jsonify({'message': 'Ami ajouté avec succès!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Erreur lors de l\'ajout de l\'ami', 'error': str(e)}), 500
    finally:
        db.session.close()


@app.route('/cave/<int:cave_id>', methods=['GET'])
def get_cave_name(cave_id):
    cave = Cave.query.get(cave_id)
    if cave:
        return jsonify({'cave_id': cave.id, 'cave_nom': cave.nom})
    else:
        return jsonify({'message': 'Cave non trouvée'}), 404


@app.route('/caves/<int:cave_id>', methods=['POST'])
def update_cave(cave_id):
    cave = Cave.query.get(cave_id)
    if cave:
        try:
            data = request.get_json()
            cave.nom = data['nom']
            db.session.commit()
            return jsonify({'message': 'Nom de la cave mis à jour avec succès!'}), 200
        except:
            db.session.rollback()
            return jsonify({'message': 'Erreur lors de la mise à jour du nom de la cave'}), 500
        finally:
            db.session.close()
    else:
        return jsonify({'message': 'Cave non trouvée'}), 404


@app.route('/cave/bouteilles/<int:caveid>', methods=['GET'])
def get_bouteilles_by_cave(caveid):
    bouteilles = Bouteille.query.filter_by(cave_id=caveid).all()
    bouteilles_list = []
    for bouteille in bouteilles:
        bouteilles_list.append({
            'id': bouteille.id,
            'nom': bouteille.nom,
            'region': bouteille.region,
            'cepage': bouteille.cepage,
            'millesime': bouteille.millesime,
            'categorie': bouteille.categorie,
            'cave_id': bouteille.cave_id
        })
    return jsonify({'bouteilles': bouteilles_list}), {'Content-Type': 'application/json; charset=utf-8'}


@app.route('/bouteilles/<int:bouteille_id>', methods=['POST'])
def update_bouteille(bouteille_id):
    if request.method == 'POST':
        data = request.get_json()
        bouteille = Bouteille.query.get(bouteille_id)
        if not bouteille:
            return jsonify({'message': 'Bouteille non trouvée'}), 404
        try:
            bouteille.nom = data.get('nom', bouteille.nom)
            bouteille.region = data.get('region', bouteille.region)
            bouteille.cepage = data.get('cepage', bouteille.cepage)
            bouteille.millesime = data.get('millesime', bouteille.millesime)
            bouteille.categorie = data.get('categorie', bouteille.categorie)
            bouteille.cave_id = data.get('cave_id', bouteille.cave_id)
            db.session.commit()
            return jsonify({'message': 'Bouteille mise à jour avec succès!'}), 200
        except Exception as e:
            db.session.rollback()
            error_message = f'Erreur lors de la mise à jour de la bouteille : {str(e)}'
            print(error_message)  # Affiche l'erreur dans la console Flask
            return jsonify({'message': error_message}), 500
        finally:
            db.session.close()


@app.route('/bouteilles/<int:bouteille_id>', methods=['DELETE'])
def delete_bouteille(bouteille_id):
    bouteille = Bouteille.query.get(bouteille_id)
    if not bouteille:
        return jsonify({'message': 'Bouteille non trouvée'}), 404
    try:
        db.session.delete(bouteille)
        db.session.commit()
        return jsonify({'message': 'Bouteille supprimée avec succès!'}), 200
    except Exception as e:
        db.session.rollback()
        error_message = f'Erreur lors de la suppression de la bouteille : {str(e)}'
        print(error_message)
        return jsonify({'message': error_message}), 500
    finally:
        db.session.close()


@app.route('/caves/<int:cave_id>', methods=['DELETE'])
def delete_cave(cave_id):
    cave = Cave.query.get(cave_id)
    if not cave:
        return jsonify({'message': 'Cave non trouvée'}), 404
    try:
        db.session.delete(cave)
        db.session.commit()
        return jsonify({'message': 'Cave supprimée avec succès!'}), 200
    except Exception as e:
        db.session.rollback()
        error_message = f'Erreur lors de la suppression de la cave : {str(e)}'
        print(error_message)
        return jsonify({'message': error_message}), 500
    finally:
        db.session.close()


@app.route('/amis/<int:ami_id>', methods=['DELETE'])
def delete_ami(ami_id):
    ami = Ami.query.get(ami_id)
    if not ami:
        return jsonify({'message': 'Ami non trouvé'}), 404
    try:
        db.session.delete(ami)
        db.session.commit()
        return jsonify({'message': 'Ami supprimé avec succès!'}), 200
    except Exception as e:
        db.session.rollback()
        error_message = f'Erreur lors de la suppression de l\'ami : {str(e)}'
        print(error_message)
        return jsonify({'message': error_message}), 500
    finally:
        db.session.close()


@app.route('/utilisateurs/<int:utilisateur_id>', methods=['DELETE'])
def delete_utilisateur(utilisateur_id):
    utilisateur = Utilisateur.query.get(utilisateur_id)
    if not utilisateur:
        return jsonify({'message': 'Utilisateur non trouvé'}), 404
    try:
        db.session.delete(utilisateur)
        db.session.commit()
        return jsonify({'message': 'Utilisateur supprimé avec succès!'}), 200
    except Exception as e:
        db.session.rollback()
        error_message = f'Erreur lors de la suppression de l\'utilisateur : {str(e)}'
        print(error_message)
        return jsonify({'message': error_message}), 500
    finally:
        db.session.close()


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
