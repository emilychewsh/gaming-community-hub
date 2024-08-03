from flask_restful import Resource
from config import db
from flask import make_response, session, request
from models import Favourite, User, Game

class GetAllFavourites(Resource):
    def get(self): #Get all favourite games stored in a list
        user_id = session.get('user_id')

        if not user_id:
            return make_response({"error": "User not logged in. Please sign in."}, 401)
        
        user = User.query.get(user_id)

        if not user:
            return make_response({"error": "User not found"}, 404)
        
        favourites = [game.to_dict() for game in user.favourites]
        return make_response({f"{user.first_name.capitalize()}'s favourite games": favourites}, 200)
    

class GetFavouriteById(Resource):
    def get(self, game_id): #Get specific favourite game by ID
        user_id = session.get('user_id')

        if not user_id:
            return make_response({"error": "User not logged in. Please sign in."}, 401)
        
        user = User.query.get(user_id)

        if not user:
            return make_response({"error": "User not found"}, 404)
        
        game = Game.query.get(game_id)
        if not game:
            return make_response({"error": "Game not Found"}, 404)
        
        favourite = Favourite.query.filter_by(user_id = user_id, game_id=game_id).first()
        if not favourite:
            return make_response ({"error": "Favourite not found"}, 404)
        
        return make_response(favourite.to_dict(), 200)

class AddToFavourites(Resource):
    def post(self):
        #Add favourite game to list 
        user_id = session.get('user_id')
        game_id = request.json.get('game_id')

        if not user_id:
            return make_response({"error": "User not logged in. Please sign in."}, 401)
        
        if not game_id:
            return make_response({"error": "Game ID required. Please enter valid Game ID"}, 401)
        
        user = User.query.get(user_id)
        if not user:
            return make_response({"error": "User not found. Please try again"}, 404)
        
        game = Game.query.get(game_id)
        if not game:
            return make_response({"error": "Game not Found"}, 404)
        
        if game in user.favourites:
            return make_response({"message": "Game is already in your favourites"}, 400)
        
        favourite = Favourite(user_id=user_id, game_id=game_id)
        db.session.add(favourite)
        db.session.commit()

        return make_response({"message": "Game added to favourite list!"}, 201)

class RemoveFromFavourites(Resource):
    def delete(self):
        #Remove game from favourite list 
        user_id = session.get('user_id')
        game_id = request.json.get('game_id')

        if not user_id:
            return make_response({"error": "User not logged in. Please sign in."}, 401)
        
        if not game_id:
            return make_response({"error": "Game ID required. Please enter valid Game ID"}, 401)
        
        user = User.query.get(user_id)
        if not user:
            return make_response({"error": "User not found. Please try again"}, 404)
        
        game = Game.query.get(game_id)
        if not game:
            return make_response({"error": "Game not Found"}, 404)
        
        favourite = Favourite.query.filter_by(user_id=user_id, game_id= game_id).first()
        if not favourite:
            return make_response({"error": "Favourite not found"}, 404)
        
        db.session.delete(favourite)
        db.session.commit()
        return make_response({"message": "Game has been removed from favourite list!"}, 200)
