from flask_restful import Resource
from config import db 
from models import User, Game
from flask import make_response, session, request
from datetime import datetime


class AdminBaseResource(Resource):
    #Set base class for admin-related resources
    def is_admin(self, user_id):
        if not user_id: 
            return False
        
        user = User.query.get(user_id)
        if not user or not user.is_admin: #checks if given user id is an admin user
            return False
        
        return True

class AdminAddGame(AdminBaseResource):
    def post(self):
        user_id = session.get('user_id')
        
        if not user_id or not self.is_admin(user_id):
            return make_response({"error": "Admin access required"}, 403)
        
        release_date_string = request.json.get('release_date')
        release_date = datetime.strptime(release_date_string, '%Y-%m-%d')
        
        game = Game(
            title = request.json.get('title'),
            genre = request.json.get('genre'),
            price = request.json.get('price'),
            description = request.json.get('description'),
            rating = request.json.get('rating'),
            platform = request.json.get('platform'),
            trailer_url = request.json.get('trailer_url'),
            release_date = release_date,
            developer = request.json.get('developer'),
            publisher = request.json.get('publisher')
        )

        db.session.add(game)
        db.session.commit()

        return make_response(game.to_dict(), 201)
    
class AdminUpdateGame(AdminBaseResource):
    def patch(self, game_id):
        user_id = session.get('user_id')

        if not user_id or not self.is_admin(user_id):
            return make_response({"error": "Admin access required"}, 403)
        
        game = Game.query.get(game_id)
        if not game:
            return make_response({"error": "Game not Found"}, 404)
        
        for attr in request.json:
            setattr(game, attr, request.json[attr])

        db.session.commit()
        return make_response(game.to_dict(), 200)
        

class AdminDeleteGame(AdminBaseResource):
    def delete(self, game_id):
        user_id = session.get('user_id')

        if not user_id or not self.is_admin(user_id):
            return make_response({"error": "Admin access required"}, 403)
        
        game = Game.query.get(game_id)
        if not game:
            return make_response({"error": "Game not Found"}, 404)
        
        db.session.delete(game)
        db.session.commit()
        return make_response({"message": "Game deleted successfully"}, 200)

class AdminLogout(AdminBaseResource):
    def delete(self):
        user_id = session.get('user_id')

        if not user_id or not self.is_admin(user_id):
            return make_response({"error": "Admin access required"}, 403)
        
        session.pop('user_id', None)
        return make_response({"message": "Admin logout successful"}, 200)