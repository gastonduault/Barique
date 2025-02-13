from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    CORS(app, resources={r"/*": {
        "origins": "*",
        "allow_headers": ["Content-Type", "Authorization"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }})



    app.config.from_object('config.Config')

    db.init_app(app)

    with app.app_context():
        from .routes import utilisateurs, caves, bouteilles, amis, historique, test

        app.register_blueprint(historique.bp)
        app.register_blueprint(utilisateurs.bp)
        app.register_blueprint(caves.bp)
        app.register_blueprint(bouteilles.bp)
        app.register_blueprint(amis.bp)
        app.register_blueprint(test.bp)

        db.create_all()

    return app
