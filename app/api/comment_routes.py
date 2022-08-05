from flask import Blueprint, request
# from flask_login import login_required
from app.models import Comment, db
from ..forms import CommentForm
from .auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

# ROUTES
# get all comments
@comment_routes.route('')
def get_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

# create a comment
@comment_routes.route('', methods=['POST'])
def post_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if (form.validate_on_submit()):
        comment = Comment(
            rating = form.data['rating'],
            body = form.data['body'],
            user_id = form.data['user_id'],
            recipe_id = form.data['recipe_id']
        )

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()

    return {'errors': [validation_errors_to_error_messages(form.errors)]}, 401
