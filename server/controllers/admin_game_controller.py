import os
from werkzeug.utils import secure_filename
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
        
        
        title = request.form.get('title')
        genre = request.form.get('genre')
        price = request.form.get('price')
        description = request.form.get('description')
        rating = request.form.get('rating')
        platform = request.form.get('platform')
        trailer_url = request.form.get('trailer_url')
        release_date_str = request.form.get('release_date')
        developer = request.form.get('developer')
        publisher = request.form.get('publisher')

        #date conversion
        try:
            release_date = datetime.strptime(release_date_str, '%Y-%m-%d')
        except ValueError:
            return make_response({"error": "Invalid date format. Use YYYY-MM-DD"}, 400)
        
        #Handle image upload
        image = request.files.get('image_url')
        
        if image:
            filename = secure_filename(image.filename)
            image_path = os.path.join('..', '..', 'client', 'public', 'images', filename)
            image.save(image_path)
            image_url = filename  # storing just the file name in db
        else:
            image_url = "default.jpg"

        # create new Game instance
        game = Game(
            title=title,
            genre=genre,
            price=price,
            description=description,
            rating=rating,
            platform=platform,
            trailer_url=trailer_url,
            release_date=release_date,
            developer=developer,
            publisher=publisher,
            image_url=image_url
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