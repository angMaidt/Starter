from flask import Blueprint, request
from app.models import Recipe, Ingredient, Instruction,  db
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
        return recipe.to_dict()

    return {'errors': [validation_errors_to_error_messages(form.errors)]}, 401

# create ingredients for a recipe
@recipe_routes.route('/ingredients', methods=['POST'])
def post_ingredient():
    form = IngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        ingredient = Ingredient(
            amount = form.data['amount'],
            food_stuff = form.data['food_stuff'],
            measurement_unit_id = form.data['measurement_unit_id'],
            recipe_id = form.data['recipe_id']
        )

        db.session.add(ingredient)
        db.session.commit()
        return ingredient.to_dict()

    return {'errors': [validation_errors_to_error_messages(form.errors)]}, 401

# create instructions for a recipe
@recipe_routes.route('/instructions', methods=['POST'])
def post_instruction():
    form = InstructionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        instruction = Instruction(
            list_order = form.data['list_order'],
            specification = form.data['specification'],
            recipe_id = form.data['recipe_id']
        )

        db.session.add(instruction)
        db.session.commit()
        return instruction.to_dict()

    return {'errors': [validation_errors_to_error_messages(form.errors)]}, 401

# edit a recipe
@recipe_routes.route('/<int:recipe_id>', methods=['PUT'])
def edit_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)

    form = RecipeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = form.data['user_id'],
        title = form.data['title'],
        description = form.data['description'],
        prep_time = form.data['prep_time'],
        bake_time = form.data['bake_time'],
        active_time = form.data['active_time'],
        baking_temp = form.data['baking_temp'],
        total_yield = form.data['total_yield']

        recipe.user_id = user_id
        recipe.title = title
        recipe.description = description
        recipe.prep_time = prep_time
        recipe.bake_time = bake_time
        recipe.active_time = active_time
        recipe.baking_temp = baking_temp
        recipe.total_yield = total_yield

        db.session.commit()
        return recipe.to_dict()

    return {'errors': [validation_errors_to_error_messages(form.errors)]}, 401

#edit ingredients
@recipe_routes.route('/ingredients/<int:ing_id>', methods=['PUT'])
def edit_ingredient(ing_id):
    ingredient = Ingredient.query.get(ing_id)

    form = IngredientForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        amount = form.data['amount'],
        food_stuff = form.data['food_stuff'],
        measurement_unit_id = form.data['measurement_unit_id'],
        recipe_id = form.data['recipe_id']

        ingredient.amount = amount
        ingredient.food_stuff = food_stuff
        ingredient.measurement_unit_id = measurement_unit_id
        ingredient.recipe_id = recipe_id

        db.session.commit()
        return ingredient.to_dict()

    return {'errors': [validation_errors_to_error_messages(form.errors)]}, 401

# create instructions for a recipe
@recipe_routes.route('/instructions/<int:inst_id>', methods=['PUT'])
def edit_instruction(inst_id):
    instruction = Instruction.query.get(inst_id)

    form = InstructionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        list_order = form.data['list_order'],
        specification = form.data['specification'],
        recipe_id = form.data['recipe_id']

        instruction.list_order = list_order
        instruction.specification = specification
        instruction.recipe_id = recipe_id

        db.session.commit()
        return instruction.to_dict()

    return {'errors': [validation_errors_to_error_messages(form.errors)]}, 401

# delete a recipe
