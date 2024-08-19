from flask_restful import Resource
from models import Game
from flask import jsonify, make_response

class GetAllGames(Resource):
    def get(self):
        games = Game.query.all()
        games_data = [{"id": game.id, "title": game.title, "genre": game.genre, "price": game.price, "description": game.description, "rating": game.rating, "platform": game.platform, 
                       "trailer_url": game.trailer_url, "release_date":game.release_date, "developer": game.developer, "publisher": game.publisher, "image_url": game.image_url} for game in games]
        return jsonify(games_data)
    
class GetGameById(Resource):
    def get(self, game_id):
        game = Game.query.get(game_id)
        if game is None:
            return make_response(jsonify({"error": "game not found"}), 404)
        
        return make_response(game.to_dict(), 200)