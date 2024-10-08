from flask_restful import Resource
from config import db 
from models import User, Game, Review, ReviewLike
from flask import make_response, session, request, jsonify


class AddReview(Resource):
    def post(self):
        user_id = session.get('user_id')
        print(f"User ID from session: {user_id}")
        
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
        title=request.json.get('title'),
        content=request.json.get('content'),
        rating=request.json.get('rating')
        )

        db.session.add(review)
        db.session.commit()
        return make_response({"message": "Review posted!", "review": review.to_dict()}, 201)

class DeleteReview(Resource):
    def delete(self):
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
        
        review = Review.query.filter_by(user_id=user_id, game_id=game_id).first()
        if not review:
            return make_response({"error": "Review not found"}, 404)
        
        db.session.delete(review)
        db.session.commit()
        return make_response({"message": "Review successfully deleted!"}, 200)

class GetAllReviews(Resource):
    def get(self):
        user_id = session.get('user_id')

        if not user_id:
            return make_response({"error": "User not logged in. Please sign in."}, 401)
        
        user = User.query.get(user_id)

        if not user:
            return make_response({"error": "User not found"}, 404)
        
        reviews = user.reviews
        if reviews:
            reviews_data = [review.to_dict() for review in reviews]
            return jsonify({'reviews': reviews_data})
        else:
            return make_response({"message": "No reviews found"}, 404)
   
class GetReviewById(Resource):
    def get(self, review_id):
        review = Review.query.get(review_id)
        
        if not review:
            return make_response({"error": "Review not found"}, 404)
        
        return make_response(review.to_dict(), 200)
    
class GetReviewsByGame(Resource):
    def get(self, game_id):
        game = Game.query.get(game_id)
        
        if not game:
            return make_response({"error": "Game not found"}, 404)
        
        reviews = Review.query.filter_by(game_id=game_id).all()

        reviews_dict = []
        for review in reviews:
            likes_count = ReviewLike.query.filter_by(review_id=review.id, is_like=True).count()
            review_data = review.to_dict()
            review_data['likes_count'] = likes_count  # Include the likes count
            reviews_dict.append(review_data)
        
        return make_response({'reviews': reviews_dict}, 200)