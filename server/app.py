from flask import make_response
from config import app, api_bp
from models import User, Game, Favourite, Review, ReviewLike

# Register the API blueprint
app.register_blueprint(api_bp, url_prefix='/api')


@app.route('/')
def index():
    return make_response({"message": "Welcome to the Gaming Community Hub!"}, 200 )

if __name__ == "__main__":
    app.run(port=4000, debug=True)