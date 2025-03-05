import os
import logging
from logging.handlers import TimedRotatingFileHandler
from flask import Flask
from app import create_app
from werkzeug.middleware.proxy_fix import ProxyFix
import firebase_admin
from firebase_admin import credentials

# Obtenir le chemin absolu du fichier de clé
firebase_key_path = "/usr/src/app/firebase-adminsdk.json"

# Vérifier si le fichier existe avant d'initialiser Firebase
if not os.path.exists(firebase_key_path):
    raise FileNotFoundError(f"Le fichier Firebase Admin SDK est introuvable : {firebase_key_path}")

cred = credentials.Certificate(firebase_key_path)
firebase_admin.initialize_app(cred)

LOG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'logs')
os.makedirs(LOG_DIR, exist_ok=True)

LOG_FILE = os.path.join(LOG_DIR, 'flask.log')

# Loh each days backup of 7 days
log_handler = TimedRotatingFileHandler(
    LOG_FILE, when="midnight", interval=1, backupCount=7, encoding='utf-8'
)
log_handler.setLevel(logging.INFO)
log_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
log_handler.setFormatter(log_formatter)

logger = logging.getLogger()
logger.setLevel(logging.INFO)
logger.addHandler(log_handler)
logger.addHandler(logging.StreamHandler())

app = create_app()
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
