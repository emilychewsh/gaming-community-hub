from config import db
from models import Game
from datetime import datetime

def seed_games():
    games = [
        Game(
            title="The Witcher 3: Wild Hunt",
            genre="RPG",
            price=60,
            description="You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world.",
            rating=92,
            platform="Available on PS4, Windows, Xbox One, Nintendo Switch, PS5 and Xbox Series X/S",
            trailer_url="https://www.youtube.com/embed/c0i88t0Kacs?si=nzEtpLMC00swjNFT",
            release_date=datetime.strptime("2015-05-19", "%Y-%m-%d").date(),
            publisher="CD Projekt",
            developer="CD Projekt Red",
            image_url = "witcher3-bg.jpeg"
        ),
        Game(
            title="Elden Ring",
            genre="Action",
            price=90,
            description="THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
            rating=96,
            platform="Available on PS4, Windows, Xbox One, PS5 and Xbox Series X/S",
            trailer_url="https://www.youtube.com/embed/qLZenOn7WUo?si=Rxu7qqaSevS4zuMh",
            release_date=datetime.strptime("2022-02-25", "%Y-%m-%d").date(),
            publisher="Bandai Namco Entertainment",
            developer="FromSoftware",
            image_url = "eldenring-bg.jpeg"
        ),
        Game(
            title="Hades",
            genre="RPG",
            price=36,
            description="Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion, Transistor, and Pyre",
            rating=93,
            platform="Available on PS4, Windows, Xbox One, Nintendo Switch, PS5, Xbox Series X/S, macOS, and iOS",
            trailer_url="https://www.youtube.com/embed/Bz8l935Bv0Y?si=lhEaVIHr3VNzfnEw",
            release_date=datetime.strptime("2020-09-17", "%Y-%m-%d").date(),
            publisher="Supergiant Games",
            developer="Supergiant Games",
            image_url = "hades-bg.jpeg"
        ),
        Game(
            title="Helldivers 2",
            genre="Action",
            price=60,
            description="The Galaxy’s Last Line of Offence. Enlist in the Helldivers and join the fight for freedom across a hostile galaxy in a fast, frantic, and ferocious third-person shooter.",
            rating=82,
            platform="Available on PS5 and Windows",
            trailer_url="https://www.youtube.com/embed/UC5EpJR0GBQ?si=gt6cWZyf5v7mY6xv",
            release_date=datetime.strptime("2024-02-20", "%Y-%m-%d").date(),
            publisher="PlayStation Studios",
            developer="Arrowhead Game Studios",
            image_url = "helldivers2-bg.jpeg"
        ),
        Game(
            title="Persona 5 Royal",
            genre="Anime",
            price=95,
            description="Don the mask and join the Phantom Thieves of Hearts as they stage grand heists, infiltrate the minds of the corrupt, and make them change their ways!",
            rating=95,
            platform="Available on PS3, Windows, Xbox One, Nintendo Switch, PS4 and Xbox Series X/S",
            trailer_url="https://www.youtube.com/embed/SKpSpvFCZRw?si=vJGFOF-R4Qqx4peT",
            release_date=datetime.strptime("2019-10-31", "%Y-%m-%d").date(),
            publisher="Atlus",
            developer="Atlus",
            image_url = "persona5-bg.jpeg"
        ),
        Game(
            title="Ni no Kuni",
            genre="Anime",
            price=75,
            description="Heart-warming tale of a young boy named Oliver, who embarks on a journey into a parallel world to become a wizard in an attempt to bring his mother back from the dead.",
            rating=85,
            platform="Available on PS3, Windows, Xbox One, Nintendo Switch & DS, PS4, Mobile Phone and Xbox Series X/S",
            trailer_url="https://www.youtube.com/embed/vGzdeUCVWOE?si=NNeDQlVkpE3ihVLQ",
            release_date=datetime.strptime("2011-11-17", "%Y-%m-%d").date(),
            publisher="Namco Bandai Games",
            developer="Level-5",
            image_url = "ninokuni-bg.jpeg"
        ),
        Game(
            title="King of Fighters XV",
            genre="Battle",
            price=85,
            description="SHATTER ALL EXPECTATIONS! Transcend beyond your limits with KOF XV!",
            rating=79,
            platform="Available on PS4, Windows, PS5 and Xbox Series X/S",
            trailer_url="https://www.youtube.com/embed/i-R_EQUIRA8?si=HppLRezGR-ZX--Ya",
            release_date=datetime.strptime("2022-02-17", "%Y-%m-%d").date(),
            publisher="SNK",
            developer="SNK",
            image_url = "king-of-fighters-xv.jpeg"
        ),
        Game(
            title="The Legend of Zelda: Tears of the Kingdom",
            genre="RPG",
            price=90,
            description="Tears of the Kingdom takes place years after Breath of the Wild, at the end of the Zelda timeline. Link and Zelda explore caverns beneath Hyrule Castle, from which gloom, a poisonous substance, has been seeping out and causing people to fall ill.",
            rating=84,
            platform="Available on Nintendo Switch",
            trailer_url="https://www.youtube.com/embed/uHGShqcAHlQ?si=afUf9wHTDpIrwdsZ",
            release_date=datetime.strptime("2023-05-12", "%Y-%m-%d").date(),
            publisher="Nintendo",
            developer="Nintendo EPD",
            image_url = "zelda-bg.jpeg"
        ),
        Game(
            title="Halo Infinite",
            genre="Battle",
            price=90,
            description="From one of gaming's most iconic sagas, Halo is bigger than ever. Featuring an expansive open-world campaign and a dynamic free to play multiplayer experience.",
            rating=87,
            platform="Available on Windows, Xbox One, and Xbox Series X/S",
            trailer_url="https://www.youtube.com/embed/PyMlV5_HRWk",
            release_date=datetime.strptime("2021-12-08", "%Y-%m-%d").date(),
            publisher="Xbox Game Studios",
            developer="343 Industries",
            image_url = "halo-bg.jpeg"
        ),
        Game(
            title="Street Fighter V",
            genre="Battle",
            price=30,
            description="Experience the intensity of head-to-head battles with Street Fighter® V! Choose from 16 iconic characters, then battle against friends online or offline with a robust variety of match options.",
            rating=77,
            platform="Available on Windows, PS4 and Arcade",
            trailer_url="https://www.youtube.com/embed/0nFd7Iylj5A?si=LwZtX0Ckbw3PBc1q",
            release_date=datetime.strptime("2016-02-16", "%Y-%m-%d").date(),
            publisher="Capcom",
            developer="Capcom",
            image_url = "streetfighter-bg.jpeg"
        ),
        Game(
            title="Mario Kart 8 Deluxe",
            genre="Racing",
            price=80,
            description="Mario Kart 8 Deluxe includes all downloadable content (DLC) for Mario Kart 8, including characters, courses, and vehicle components, into a single product for Nintendo Switch, as well as being the first Mario game for the console.",
            rating=92,
            platform="Available on Nintendo Switch",
            trailer_url="https://www.youtube.com/embed/tKlRN2YpxRE",
            release_date=datetime.strptime("2017-04-28", "%Y-%m-%d").date(),
            publisher="Nintendo",
            developer="Nintendo EPD",
            image_url = "mario-bg.jpeg"
        ),
        Game(
            title="FINAL FANTASY VII Remake",
            genre="Action",
            price=115,
            description="Cloud Strife, an ex-SOLDIER operative, descends on the mako-powered city of Midgar. The world of the timeless classic FINAL FANTASY VII is reborn, using cutting-edge graphics technology, a new battle system and an additional adventure featuring Yuffie Kisaragi.",
            rating=92,
            platform="Available on Windows, Xbox One, Nintendo Switch, PS4, iOS and Android",
            trailer_url="https://www.youtube.com/embed/Ge73iBqc7o8?si=TeGGgmHJskOjz12a",
            release_date=datetime.strptime("2020-04-10", "%Y-%m-%d").date(),
            publisher="Square Enix",
            developer="Square Enix",
            image_url = "finalfantasy-bg.jpeg"
        ),
        Game(
            title="F1® 24",
            genre="Racing",
            price=100,
            description="Join the grid and Be One of the 20. Drive like the Greatest in EA SPORTS™ F1® 24, the official video game of the 2024 FIA Formula One World Championship™.",
            rating=74,
            platform="Available on Windows, Xbox One, PS4, PS5 and Xbox Series X/S",
            trailer_url="https://www.youtube.com/embed/4rCs87muGjc?si=ZTUD_n-cLnMmtvfi",
            release_date=datetime.strptime("2024-07-19", "%Y-%m-%d").date(),
            publisher="EA Sports",
            developer="Codemasters",
            image_url = "f1-bg.jpeg"
        ),
        Game(
            title="Tekken 8",
            genre="Battle",
            price=105,
            description="TEKKEN 8 continues the tragic saga of the Mishima bloodline and its world-shaking father-and-son grudge matches. After defeating his father, Heihachi Mishima, Kazuya continues his conquest for global domination, using the forces of G Corporation to wage war on the world. Jin is forced to face his fate head-on as he is reunited with his long-lost mother and seeks to stop his father Kazuya's reign of terror.",
            rating=90,
            platform="Available on PS5, Windows and Xbox Series X/S",
            trailer_url="https://www.youtube.com/embed/_MM4clV2qjE?si=MW2kW90tad0AIymz",
            release_date=datetime.strptime("2024-01-26", "%Y-%m-%d").date(),
            publisher="Bandai Namco Entertainment",
            developer="Bandai Namco Studios",
            image_url = "tekken8-bg.jpeg"
        ),
        Game(
            title="Hollow Knight",
            genre="RPG",
            price=22,
            description="Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes. Explore twisting caverns, battle tainted creatures and befriend bizarre bugs, all in a classic, hand-drawn 2D style.",
            rating=90,
            platform="Available on Windows, Xbox One, Nintendo Switch, PS4 and macOS",
            trailer_url="https://www.youtube.com/embed/UAO2urG23S4?si=9Hf5IyIemPda6Y09",
            release_date=datetime.strptime("2017-02-24", "%Y-%m-%d").date(),
            publisher="Team Cherry",
            developer="Team Cherry",
            image_url = "hollowknight-bg.jpeg"
        )
    ]

    db.session.add_all(games)
    db.session.commit()

if __name__ == "__main__":
    from config import app
    with app.app_context():
        seed_games()
    print("Seeding complete!")