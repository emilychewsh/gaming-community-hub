from config import db
from models import ReviewLike

def seed_reviewlikes():
    review_likes = [
        ReviewLike(
            is_like= 1,
            user_id = 1,
            review_id = 2
        ),
        ReviewLike(
            is_like= 1,
            user_id = 1,
            review_id = 3
        ),
        ReviewLike(
            is_like= 1,
            user_id = 2,
            review_id = 1
        ),
        ReviewLike(
            is_like= 1,
            user_id = 2,
            review_id = 4
        ),
        ReviewLike(
            is_like= 1,
            user_id = 2,
            review_id = 6
        ),
        ReviewLike(
            is_like= 1,
            user_id = 2,
            review_id = 3
        ),
        ReviewLike(
            is_like= 1,
            user_id = 1,
            review_id = 6
        ),
    ]

    db.session.add_all(review_likes)
    db.session.commit()

if __name__ == "__main__":
    from config import app
    with app.app_context():
        seed_reviewlikes()
    print("Seeding for reviewlikes complete!")