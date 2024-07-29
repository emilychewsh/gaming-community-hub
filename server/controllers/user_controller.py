from flask_restful import Resource
from config import db
from flask import make_response, session, request
from models import User


class UserSignup(Resource):
    def post(self):

        user = User(
            username = request.json.get('username'),
            email = request.json.get('email'),
            first_name = request.json.get('first_name'),
            last_name = request.json.get('last_name'),
            password = request.json.get('password'),
            is_admin = bool(request.json.get('is_admin', False)) #convert to boolean, defaults False if nothing provided
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

                if user and user.authenticate_password(password):
                    session['user_id'] = user.id
                    return make_response({"message": f"Welcome {user.first_name.title()}, you have successfully logged in!"}, 200)

                else:
                    return make_response({"error": "Unauthorised"}, 401)

            else:
                return make_response({"error": "Username and password are required to login. Please try again"}, 400)
            
        return make_response({"error": "User already logged in"}, 400)


class UserLogout(Resource):
    def delete(self):
        session.pop('user_id', None)

        return make_response({"message": "Logout successful"}, 200)


class UserAccount(Resource):
    def get(self):

        if 'user_id' not in session:
            return make_response({"error": {"No user logged in. Please log into your account."}}, 403)
        
        user_id = session['user_id']
        user = User.query.filter(User.id == session['user_id']).first()

        if user:
            return make_response(user.to_dict(), 200)
        

        return make_response({"message": "No user found."}, 403)
    
    def patch(self):

        if 'user_id' not in session:
            return make_response({"error": {"No user logged in. Please log into your account."}}, 403)
        
        user_id = session['user_id']
        user = User.query.filter(User.id == session['user_id']).first()

        if user:
            for attr in request.json:
                setattr(user, attr, request.json[attr])

            db.session.commit()
            return make_response(user.to_dict(), 203)
        
        return make_response({"message": "No user found"}, 404)
        
    def delete(self):

        if 'user_id' not in session:
            return make_response({"error": {"No user logged in. Please log into your account."}}, 403)
        
        user_id = session['user_id']
        user = User.query.filter(User.id == session['user_id']).first()

        if user:
            db.session.delete(user)
            db.session.commit()
            session.pop('user_id', None)

            return make_response({"message": "User account deleted successfully."}, 200)
        

        return make_response({"message": "No user found"}, 404)