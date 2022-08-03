from flask import Blueprint, request
from app.models import Recipe, Ingredient, Instruction, MeasurementUnit, db
from ..forms import RecipeForm
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
    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        recipe = Recipe(
            user_id = form.data['user_id'],
            title = form.data['title'],
            description = form.data['description'],
            prep_time = form.data['prep_time'],
            bake_time = form.data['bake_time'],
            active_time = form.data['active_time'],
            baking_temp = form.data['baking_temp'],
            total_yield = form.data['total_yield']
        )

        db.session.add(recipe)
        db.session.commit()

        # ingredients
        if form.data.ing_1:
            ing_1 = Ingredient(
                amount = form.data.ing_1['amount'],
                food_stuff = form.data.ing_1['food_stuff'],
                measurement_unit_id = form.data.ing_1['measurement_unit_id'],
                recipe_id = recipe.id,
            )
            db.session.add(ing_1)

        if form.data.ing_2:
            ing_2 = Ingredient(
                amount = form.data.ing_2['amount'],
                food_stuff = form.data.ing_2['food_stuff'],
                measurement_unit_id = form.data.ing_2['measurement_unit_id'],
                recipe_id = recipe.id,
            )
            db.session.add(ing_2)

        # instructions
        if form.data.inst_1:
            inst_1 = Instruction(
                list_order = form.data.inst_1['list_order'],
                specification = form.data.inst_1['specification'],
                recipe_id = recipe.id
            )
            db.session.add(inst_1)

        if form.data.inst_2:
            inst_2 = Instruction(
                list_order = form.data.inst_2['list_order'],
                specification = form.data.inst_2['specification'],
                recipe_id = recipe.id
            )
            db.session.add(inst_2)

        db.session.commit()
        return recipe.to_dict()

    return {'errors': [validation_errors_to_error_messages(form.errors)]}, 401




# edit a recipe

# delete a recipe
