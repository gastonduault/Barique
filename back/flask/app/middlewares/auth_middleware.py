from flask import request, jsonify
from firebase_admin import auth

def verify_token():

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return None, (jsonify({"message": "Missing or incorrectly formed token"}), 401)

    token = auth_header.split("Bearer ")[1]

    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token, None
    except Exception as e:
        return None, (jsonify({"message": "Token not valid", "error": str(e)}), 401)