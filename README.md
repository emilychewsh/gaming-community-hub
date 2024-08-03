# Gaming Community Hub

Welcome to my Flask Project for phase 4 with Academy Xi! <br>

## What's it About?

A full-stack application that serves as a hub for gamers. Users can create accounts, stay logged in, look up favorite games, write reviews, view other reviews, manage favorites, and more. The admin side allows creating, deleting, and updating games.

## Features

- User authentication (sign up, log in, log out)
- Game management (add, update, delete) for admins
- Favorite games management
- Write, view, and delete reviews
- Like or dislike reviews
- Admin management of games

## Technologies Used

- Flask
- Flask-SQLAlchemy
- Flask-RESTful
- Flask-migrate
- Flask-Bcrypt
- Flask-CORS
- SQLAlchemy-Serializer

## Getting Started

1. Clone the Repository to your local machine:

```bash
git clone https://github.com/emilychewsh/gaming-community-hub.git
cd gaming-community-hub
```

2. Install the dependencies:

```bash
pipenv install
```

3. Set up the virtual environment using Pipenv.

```bash
pipenv shell
```

4. Set up the database:

```bash
flask db upgrade
```

5. Start the app:

```bash
cd server
python app.py
```

6. Postman or other agents will be needed to test the API.

## API Endpoints

### User authentication

### Game Management (Admin only)

### Favourites

### Reviews

### ReviewLikes

## Database Schema

These are the 5 tables:

### User

| Column     | Type    | Description          |
| ---------- | ------- | -------------------- |
| id         | Integer | Primary key          |
| username   | String  | User names to log in |
| first_name | String  | First name           |
| last_name  | String  | Last name            |
| email      | String  | email                |
| password   | String  | password             |
| is_admin   | Boolean | Admin or user        |

### Game

| Column       | Type    | Description        |
| ------------ | ------- | ------------------ |
| id           | Integer | Primary key        |
| title        | String  | Title of game      |
| genre        | String  | Genre of game      |
| price        | Integer | Price of game      |
| description  | String  | Storyline of game  |
| rating       | Intger  | Game rating        |
| platform     | String  | Platform available |
| trailer_url  | String  | Youtube URL        |
| release_date | Date    | Game release date  |
| developer    | String  | Game developer     |
| publisher    | String  | Game publisher     |

### Favourite

| Column  | Type    | Description             |
| ------- | ------- | ----------------------- |
| id      | Integer | Primary key             |
| user_id | Integer | Foreign Key for `users` |
| game_id | Integer | Foreign Key for `games` |

### Review

| Column     | Type    | Description             |
| ---------- | ------- | ----------------------- |
| id         | Integer | Primary key             |
| content    | String  | Review content          |
| rating     | Integer | Game rating out of 5    |
| created_at | Date    | Date review was created |
| user_id    | Integer | Foreign Key for `users` |
| game_id    | Integer | Foreign Key for `games` |

### ReviewLike

| Column    | Type    | Description                |
| --------- | ------- | -------------------------- |
| id        | Integer | Primary key                |
| is_like   | Boolean | like/dislike other reviews |
| user_id   | Integer | Foreign Key for `users`    |
| review_id | Integer | Foreign Key for `reviews`  |

## License

This project is licensed under the MIT License.

## Contribution Guidelines

If you would like to contribute to the project development:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and submit a pull request.

Feel free to adjust any details or formatting to better suit your project and preferences.

## Contact

For any inquiries or feedback, please contact codewithemilychew@gmail.com.
