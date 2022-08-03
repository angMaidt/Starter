from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, Form, FormField
from wtforms.validators import DataRequired, Length
# from ..models import MeasurementUnit
# from app.models import Recipe

class IngredientForm(Form):
    amount = IntegerField('Amount')
    # measurement_unit_id = SelectField('Measurement Unit', choices=[(1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (11), (12), (13)])
    measurement_unit_id = IntegerField('Measurement Unit')
    food_stuff = StringField('Food Stuff')
    # recipe_id = IntegerField('Recipe')

class InstructionForm(Form):
    list_order = IntegerField('List Order')
    specification = StringField('Specification')

class RecipeForm(FlaskForm):
    user_id = IntegerField('User Id', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired(), Length(min=5, max=50)])
    # image_url = StringField('Image Url', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired(), Length(min=5, max=2000)])
    prep_time = IntegerField('Prep Time', validators=[DataRequired()])
    bake_time = IntegerField('Bake Time', validators=[DataRequired()])
    active_time = IntegerField('Active Time', validators=[DataRequired()])
    baking_temp = IntegerField('Baking Temp', validators=[DataRequired()])
    total_yield = StringField('Total Yield', validators=[DataRequired()])

    # ingredients
    ing_1 = FormField(IngredientForm)
    ing_2 = FormField(IngredientForm)
    ing_3 = FormField(IngredientForm)
    ing_4 = FormField(IngredientForm)
    ing_5 = FormField(IngredientForm)
    ing_6 = FormField(IngredientForm)
    ing_7 = FormField(IngredientForm)
    ing_8 = FormField(IngredientForm)
    ing_9 = FormField(IngredientForm)
    ing_10 = FormField(IngredientForm)
    ing_11 = FormField(IngredientForm)
    ing_12 = FormField(IngredientForm)
    ing_13 = FormField(IngredientForm)
    ing_14 = FormField(IngredientForm)
    ing_15 = FormField(IngredientForm)

    # instructions
    inst_1 = FormField(InstructionForm)
    inst_2 = FormField(InstructionForm)
    inst_3 = FormField(InstructionForm)
    inst_4 = FormField(InstructionForm)
    inst_5 = FormField(InstructionForm)
    inst_6 = FormField(InstructionForm)
    inst_7 = FormField(InstructionForm)
    inst_8 = FormField(InstructionForm)
    inst_9 = FormField(InstructionForm)
    inst_10 = FormField(InstructionForm)
    inst_11 = FormField(InstructionForm)
    inst_12 = FormField(InstructionForm)
    inst_13 = FormField(InstructionForm)
    inst_14 = FormField(InstructionForm)
    inst_15 = FormField(InstructionForm)
    inst_16 = FormField(InstructionForm)
    inst_17 = FormField(InstructionForm)
    inst_18 = FormField(InstructionForm)
    inst_19 = FormField(InstructionForm)
    inst_20 = FormField(InstructionForm)
