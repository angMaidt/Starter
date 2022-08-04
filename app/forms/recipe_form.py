from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, Form, FormField
from wtforms.validators import DataRequired, Length

class RecipeForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired(), Length(min=5, max=50)])
    description = StringField('Description', validators=[DataRequired(), Length(min=5, max=2000)])
    image_url = StringField("Image")
    prep_time = IntegerField('Prep Time', validators=[DataRequired()])
    bake_time = IntegerField('Bake Time', validators=[DataRequired()])
    active_time = IntegerField('Active Time', validators=[DataRequired()])
    baking_temp = IntegerField('Baking Temp', validators=[DataRequired()])
    total_yield = StringField('Total Yield', validators=[DataRequired()])
