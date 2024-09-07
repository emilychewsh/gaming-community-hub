from config import db
from models import Review
from datetime import datetime

def seed_reviews():
    reviews = [
        Review(
            title= "Great game!",
            content= "Exciting comeback win in the final inning",
            rating= 5,
            created_at= datetime.strptime("2024-09-07", "%Y-%m-%d").date(),
            user_id = 1,
            game_id = 1
        ),
        Review(
            title= "Disappointing performance",
            content= "Pitching struggles led to defeat",
            rating= 2,
            created_at= datetime.strptime("2024-08-07", "%Y-%m-%d").date(),
            user_id = 2,
            game_id = 1
        ),
        Review(
            title= "Great game!",
            content= "Great game with intense moments",
            rating= 4,
            created_at= datetime.strptime("2024-04-07", "%Y-%m-%d").date(),
            user_id = 3,
            game_id = 1
        ),
        Review(
            title= "Underwhelming gameplay",
            content= "Could be better.",
            rating= 2,
            created_at= datetime.strptime("2024-01-24", "%Y-%m-%d").date(),
            user_id = 1,
            game_id = 2
        ),
        Review(
            title= "Close call",
            content= "Disappointing loss after a strong start",
            rating= 3,
            created_at= datetime.strptime("2024-05-13", "%Y-%m-%d").date(),
            user_id = 2,
            game_id = 2
        ),
        Review(
            title= "Impressive win",
            content= "Loved the storyline.",
            rating= 5,
            created_at= datetime.strptime("2024-06-15", "%Y-%m-%d").date(),
            user_id = 3,
            game_id = 2
        ),
        Review(
            title= "GGEZ",
            content= "Multiplayer is fun.",
            rating= 4,
            created_at= datetime.strptime("2024-05-17", "%Y-%m-%d").date(),
            user_id = 4,
            game_id = 2
        ),
    ]

    db.session.add_all(reviews)
    db.session.commit()

if __name__ == "__main__":
    from config import app
    with app.app_context():
        seed_reviews()
    print("Seeding for reviews complete!")