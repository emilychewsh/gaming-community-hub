from flask_restful import Resource
from config import db, bcrypt
from flask import make_response, session, request
from models import User


class UserSignup(Resource):
    def post(self):

        user = User(
            username = request.json.get('username'),
            email = request.json.get('email'),
            first_name = request.json.get('first_name'),
            last_name = request.json.get('last_name'),
            password = request.json.get('password')
        )

        db.session.add(user)
        db.session.commit()

        if user.id:
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)
        
        return make_response({"error":"User signup unsuccessful"}, 400)
    
class UserLogin(Resource):
    def post(self):
        
        if 'user_id' not in session:

            username = request.json.get('username')
            password = request.json.get('password')

            if username and password:
                user = User.query.filter(User.username == username).first()

                if user and user.authenticate(password):
                    session['user_id'] = user.id
                    return make_response({"message": f"User {user.first_name} logged in!"})

                else:
                    return make_response({"error": "Unauthorised"}, 401)

            else:
                return make_response({"error": "username and password are required to login. Please try again"}, 404)
            
        return make_response({"error": "User already logged in"}, 404)
            
class UserLogout(Resource):
    def delete(self):
        session.pop('user_id', None)

        return make_response({"message": "Logout successful"}, 200)

class CheckSession(Resource):
    def get(self):
        user = User.query.filter(User.id == session['user_id']).first()

        if user:
            return make_response(user.to_dict(), 200)
        
        return make_response({"error": "No user signed in..."}, 401)