from app.seeds.recipes import undo_recipes
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .measurement_units import seed_measurement_units, undo_measurement_units
from .recipes import seed_recipes, undo_recipes

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_measurement_units()
    seed_recipes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_measurement_units()
    undo_recipes()
    # Add other undo functions here
