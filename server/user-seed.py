from config import db
from models import User

def seed_users():
    users = [
        User(
            username= "fsatcher0",
            first_name= "Finley",
            last_name= "Satcher",
            email= "fsatcher0@a8.net",
            password= "abcdefg"
        ),
        User(
            username= "fbento1",
            first_name= "Francesca",
            last_name= "Bento",
            email= "fbento1@instagram.com",
            password= "helloworld"
        ),
        User(
            username= "rkermott2",
            first_name= "Ruthy",
            last_name= "Kermott",
            email= "rkermott2@squidoo.com",
            password= "moewmeow"
        ),
        User(
            username= "lstoneham3",
            first_name= "Lydon",
            last_name= "Stoneham",
            email= "lstoneham3@dailymail.com",
            password= "goose"
        ),
        User(
            username= "superadmin",
            first_name= "admin",
            last_name= "super",
            email= "superadmin@gmail.com",
            password= "admin",
            is_admin = 1
        )
    ]

    db.session.add_all(users)
    db.session.commit()

if __name__ == "__main__":
    from config import app
    with app.app_context():
        seed_users()
    print("Seeding for users complete!")