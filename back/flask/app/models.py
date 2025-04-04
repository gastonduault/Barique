from . import db
from datetime import datetime

class Utilisateur(db.Model):
    __tablename__ = 'utilisateurs'
    uid = db.Column(db.String(500), primary_key=True)
    account_id = db.Column(db.String(50))
    nom = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    profile_picture = db.Column(db.String(500))

class Cave(db.Model):
    __tablename__ = 'caves'
    id = db.Column(db.Integer, primary_key=True)
    proprietaire_uid = db.Column(db.String(500), db.ForeignKey('utilisateurs.uid'), nullable=False)
    nom = db.Column(db.String(50), nullable=False, unique=True)
    profile_picture = db.Column(db.String(500))

class Bouteille(db.Model):
    __tablename__ = 'bouteilles'
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(50), nullable=False)
    region = db.Column(db.String(50))
    cepage = db.Column(db.String(50))
    millesime = db.Column(db.Integer)
    categorie = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer)
    notice = db.Column(db.String(500))
    cave_id = db.Column(db.Integer, db.ForeignKey('caves.id'), nullable=False)

class Historique(db.Model):
    __tablename__ = 'historique'
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(255), nullable=False)
    region = db.Column(db.String(255), nullable=True)
    cepage = db.Column(db.String(255), nullable=True)
    millesime = db.Column(db.Integer, nullable=True)
    categorie = db.Column(db.String(255), nullable=True)
    cave_id = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Integer)
    notice = db.Column(db.String(500))
    date_suppression = db.Column(db.DateTime, default=datetime.utcnow)
