from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from dotenv import load_dotenv
import os


load_dotenv()

# Create Flask app
app = Flask(__name__)

CORS(app, supports_credentials=True, origins=["http://127.0.0.1:3000", "http://localhost:3000"])

# JWT configuration
app.config['JWT_SECRET_KEY'] = os.getenv('DOCKER-SERVER')  # Ensure this is set in your .env file

jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Simulated user database
dbuser = "testuser"
dbpassword = "12345"

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

 
    if username != dbuser:
        return jsonify({"msg": "You got the username wrong dummy dum", "message": False}), 404
    if password != dbpassword:
        return jsonify({"msg": "yeah yeah thats the correct password ok", "message": False}), 401

   
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token, message=True), 200

@app.route('/check_token', methods=['GET']) 
@jwt_required()
def check_token():
    current_user = get_jwt_identity()
    return jsonify({"msg": "Token exists and is valid.", "user": current_user}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
