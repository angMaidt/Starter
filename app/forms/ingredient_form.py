from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, Length
# from ..models import MeasurementUnit

# UNIT_CHOICES = [(1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (11), (12), (13)]
# UNIT_CHOICES = [(unit.id) for unit in MeasurementUnit.query.all()]

class IngredientForm(FlaskForm):
    amount = IntegerField('Amount', validators=[DataRequired()])
    food_stuff = StringField('Food Stuff', validators=[DataRequired(), Length(min=1, max=50)])
    # measurement_unit_id = SelectField('Measurement Unit', validators=[DataRequired()], choices=[UNIT_CHOICES])
    measurement_unit_id = SelectField('Measurement Unit', validators=[DataRequired()], validate_choice=False)
    recipe_id = IntegerField('Recipe', validators=[DataRequired()])
