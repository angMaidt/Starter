from turtle import title
from flask import Blueprint, request
from app.forms.instruction_form import InstructionForm
from app.models import Recipe, Ingredient, Instruction, db
from ..forms import RecipeForm, IngredientForm, InstructionForm
from .auth_routes import validation_errors_to_error_messages


recipe_routes = Blueprint('recipes', __name__)

# ROUTES
# get all recipes
@recipe_routes.route('')
def get_recipes():
    recipes = Recipe.query.all()
    return {'recipes': [recipe.to_dict() for recipe in recipes]}

# create a recipe
@recipe_routes.route('', methods=['POST'])
def post_recipe():

    form1 = RecipeForm()
    form2 = IngredientForm()
    form3 = InstructionForm()

    form1['csrf_token'].data = request.cookies['csrf_token']
    if form1.validate_on_submit():
        recipe = Recipe(
            user_id = form1.data['user_id'],
            title = form1.data['title'],
            image_url = form1.data['image_url'],
            description = form1.data['description'],
            prep_time = form1.data['prep_time'],
            bake_time = form1.data['bake_time'],
            active_time = form1.data['active_time'],
            baking_temp = form1.data['baking_temp'],
            total_yield = form1.data['total_yield']
        )

        db.session.add(recipe)
        db.session.commit()

        form2['csrf_token'].data = request.cookies['csrf_token']
        if form2.validate_on_submit():
            ingredient = Ingredient(
                amount = form2.data['amount'],
                food_stuff = form2.data['food_stuff'],
                measurement_unit_id = form2.data['measurement_unit_id'],
                recipe_id = form2.data['recipe_id'],
            )

            db.session.add(ingredient)
            # db.session.commit()

            form3['csrf_token'].data = request.cookies['csrf_token']
            if form3.validate_on_submit():
                instruction = Instruction(
                    list_order = form3.data['list_order'],
                    specification = form3.data['specification'],
                    recipe_id = form3.data['recipe_id']
                )

                db.session.add(instruction)
                db.session.commit()
                return recipe.to_dict()
                
    return {'errors': [validation_errors_to_error_messages(form1.errors), validation_errors_to_error_messages(form2.errors), validation_errors_to_error_messages(form3.errors)]}, 401




# edit a recipe

# delete a recipe
