from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, Length

class IngredientForm(FlaskForm):
    amount = IntegerField('Amount', validators=[DataRequired()])
    food_stuff = StringField('Food Stuff', validators=[DataRequired(), Length(min=1, max=50)])
    measurement_unit_id = SelectField('Measurement Unit', validators=[DataRequired()], validate_choice=False)
    recipe_id = IntegerField('Recipe', validators=[DataRequired()])
