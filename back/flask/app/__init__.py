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
        from .routes import utilisateurs, caves, bouteilles, historique, test

        app.register_blueprint(historique.bp, url_prefix='/api/history')
        app.register_blueprint(utilisateurs.bp, url_prefix='/api/login')
        app.register_blueprint(caves.bp, url_prefix='/api/cellars')
        app.register_blueprint(bouteilles.bp, url_prefix='/api/bottles')
        app.register_blueprint(test.bp, url_prefix='/api/test')

        db.create_all()

    return app
