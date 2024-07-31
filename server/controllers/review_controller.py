from flask_restful import Resource
from config import db 
from models import User, Game, Review
from flask import make_response, session, request

class ReviewController(Resource):
    def get(self):
        user_id = session.get('user_id')

        if not user_id:
            return make_response({"error": "User not logged in. Please sign in."}, 401)
        
        user = User.query.get(user_id)

        if not user:
            return make_response({"error": "User not found"}, 404)
        
        reviews = [review.to_dict() for review in user.reviews]
        if not reviews:
            return make_response({"error": "No reviews yet"}, 404)
        
        return make_response({'reviews': reviews}, 200)
    
    
    def post(self):
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
        
        existing_review = Review.query.filter_by(user_id=user_id, game_id=game_id).first()
        if existing_review:
            return make_response({"error": "You have already reviewed this game"}, 400)

        review = Review(
        user_id=user_id,
        game_id=game_id,
        content=request.json.get('content'),
        rating=request.json.get('rating')
        )

        db.session.add(review)
        db.session.commit()
        return make_response({"message": "Review posted!"}, 201)