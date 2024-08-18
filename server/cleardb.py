from config import app, db
from models import User, Game, Review, ReviewLike, Favourite

def clear_all_records():
    db.session.query(User).delete()
    db.session.query(Game).delete()
    db.session.query(Review).delete()
    db.session.query(ReviewLike).delete()
    db.session.query(Favourite).delete()
    db.session.commit()
    print("All records have been cleared!")

if __name__ == "__main__":
    with app.app_context():
        clear_all_records()