from flask import make_response
from config import app, api
from models import User, Game, Favourite, Review, ReviewLike
from controllers.user_controller import UserSignup, UserLogin, UserLogout, UserAccount
from controllers.admin_game_controller import AdminAddGame, AdminUpdateGame, AdminDeleteGame



@app.route('/')
def index():
    return make_response({"message": "Welcome to the Gaming Community Hub!"}, 200 )

#User Controller
api.add_resource(UserSignup, '/user/signup')
api.add_resource(UserLogin, '/user/login')
api.add_resource(UserLogout, '/user/logout')
api.add_resource(UserAccount, '/user/account')

#Admin Game Controller
api.add_resource(AdminAddGame, '/admin/add_game')
api.add_resource(AdminUpdateGame, '/admin/update_game/<int:game_id>')
api.add_resource(AdminDeleteGame, '/admin/delete_game/<int:game_id>')

if __name__ == "__main__":
    app.run(port=4000, debug=True)