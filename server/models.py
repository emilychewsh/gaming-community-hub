from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime

class User (db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    _hashed_password = db.Column(db.String(), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    favourites = db.relationship("Favourite", back_populates="user")
    games = association_proxy("favourites", "game", creator=lambda g: Favourite(game=g))
    reviews = db.relationship("Review", backref="author")


    def __repr__(self):
        return f"<User: {self.username}>"

class Game (db.Model, SerializerMixin):
    __tablename__ = "games"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    platform = db.Column(db.String, nullable=False)
    trailer_url = db.Column(db.String, nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    developer = db.Column(db.String, nullable=False)
    publisher = db.Column(db.String, nullable=False)

    favourites = db.relationship("Favourite", back_populates="game")
    users = association_proxy("favourites", "user", creator=lambda u: Favourite(user=u) )

    def __repr__(self):
        return f"<Game: {self.title} | {self.genre}>"


class Favourite (db.Model, SerializerMixin):
    __tablename__ = "favourites"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    user = db.relationship("User", back_populates="favourites")
    game = db.relationship("Game", back_populates="favourites")

    def __repr__(self):
        return f"<Favourite: {self.game_id}>"

class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Date, nullable=False, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    def __repr__(self):
        return f'<Review {self.rating}>'

class ReviewLike(db.Model, SerializerMixin):
    __tablename__ = "review_likes"

    id = db.Column(db.Integer, primary_key=True)
    is_like = db.Column(db.Boolean)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'))

    def __repr__(self):
        return f'<ReviewLike {self.is_like}>'
