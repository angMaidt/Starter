from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length
# from app.models import Recipe

class InstructionForm(FlaskForm):
    list_order = IntegerField('List Order', validators=[DataRequired])
    specification = StringField('Specification', validators=[DataRequired, Length(min=1, max=1000)])
    recipe_id = IntegerField('Recipe', validators=[DataRequired])
