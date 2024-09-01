from config import db, bcrypt
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
import re

class User (db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    first_name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    _hashed_password = db.Column(db.String(), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

    favourites = db.relationship("Favourite", back_populates="user")
    games = association_proxy("favourites", "game", creator=lambda g: Favourite(game=g))
    reviews = db.relationship("Review", backref="author")

    serialize_rules = ('-_hashed_password','-favourites', '-reviews.author')

    #Validate username
    @validates('username')
    def validate_username(self, key, username):
        username_regex = r'^[a-zA-Z][a-zA-Z0-9]{3,}$'
        if not username:
            raise ValueError("Username is required.")
        
        if not re.match(username_regex, username):
            raise ValueError('Username must be at least 4 characters long, start with a letter, and contain only letters and numbers.')
        
        return username
    
    #Validate first and last name
    @validates('first_name', 'last_name')
    def validate_name(self, key, name):
        name_regex = r"^[a-zA-Z]+$"
        if not name:
            raise ValueError("First and last names are required.")
        
        if not re.match(name_regex, name):
            raise ValueError(f'{key.replace("_", " ").capitalize()} should only contain letters')
        
        return name
    
    @validates('email')
    def validate_email(self, key, email):
        email_regex =  r'^[A-Za-z.0-9+@[A-Za-z0-9.]+\.[A-Za-z]{2,7}$'

        if not email:
            raise ValueError("Email is required")
        
        if User.query.filter(User.email == email).first():
            raise ValueError("Email already taken")
        
        if not re.match(email_regex, email):
            raise ValueError("Email not valid")
        
        return email
        

    #Validations for password settings
    @hybrid_property
    def password(self):
        return self._hashed_password
    
    @password.setter
    def password(self, plain_password):
        password_hash = bcrypt.generate_password_hash(plain_password.encode('utf-8'))

        self._hashed_password = password_hash.decode('utf-8')

    def authenticate_password(self, plain_password):
        return bcrypt.check_password_hash(self._hashed_password, plain_password.encode('utf-8'))

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
    image_url = db.Column(db.String)

    favourites = db.relationship("Favourite", back_populates="game")
    users = association_proxy("favourites", "user", creator=lambda u: Favourite(user=u) )

    serialize_rules = ('-favourites', '-reviews')

    def __repr__(self):
        return f"<Game: {self.title} | {self.genre}>"


class Favourite (db.Model, SerializerMixin):
    __tablename__ = "favourites"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    user = db.relationship("User", back_populates="favourites")
    game = db.relationship("Game", back_populates="favourites")

    serialize_rules = ('-user.favourites', '-game.favourites')

    def __repr__(self):
        return f"<Favourite: {self.game_id}>"

class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True) 
    title = db.Column(db.String, nullable=False)
    content = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.Date, nullable=False, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    game_id = db.Column(db.Integer, db.ForeignKey('games.id'))

    serialize_rules = ('-user.favourites', '-game.favourites', '-user.reviews', '-game.reviews', '-author.reviews', )

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
