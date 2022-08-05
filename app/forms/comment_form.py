from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired()])
    body = StringField('body')
    user_id = IntegerField('user', validators=[DataRequired()])
    recipe_id = IntegerField('recipe id', validators=[DataRequired()])
    # updated_at = DateTimeField('datetime')
