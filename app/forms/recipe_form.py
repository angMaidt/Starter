from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Length
# from app.models import Recipe

class RecipeForm(FlaskForm):
    user_id = IntegerField('User_Id', validators=[DataRequired])
    title = StringField('Title', validators=[DataRequired, Length(min=5, max=50)])
    image_url = StringField('Image Url', validators=[DataRequired])
    description = StringField('Description', validators=[DataRequired, Length(min=5, max=2000)])
    prep_time = IntegerField('Prep Time', validators=[DataRequired])
    bake_time = IntegerField('Bake Time', validators=[DataRequired])
    active_time = IntegerField('Active Time', validators=[DataRequired])
    baking_temp = IntegerField('Baking Temp', validators=[DataRequired])
    total_yield = IntegerField('Total Yield', validators=[DataRequired])
