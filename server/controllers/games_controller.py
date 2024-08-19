from flask_restful import Resource
from models import Game
from flask import jsonify

class GetAllGames(Resource):
    def get(self):
        games = Game.query.all()
        games_data = [{"id": game.id, "title": game.title, "genre": game.genre, "price": game.price, "description": game.description, "rating": game.rating, "platform": game.platform, 
                       "trailer_url": game.trailer_url, "release_date":game.release_date, "developer": game.developer, "publisher": game.publisher, "image_url": game.image_url} for game in games]
        return jsonify(games_data)