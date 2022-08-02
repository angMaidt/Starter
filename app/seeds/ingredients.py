from app.models import db, Ingredient, measurement_units


# Adds a demo user, you can add other users here if you want
def seed_ingredients():
    ing1 = Ingredient(
        amount = 100,
        food_stuff = 'sourdough starter',
        measurement_unit_id = 1,
        recipe_id = 1
        )
    ing2 = Ingredient(
        amount = 375,
        food_stuff = 'tepid water',
        measurement_unit_id = 4,
        recipe_id = 1
        )
    ing3 = Ingredient(
        amount = 500,
        food_stuff = 'strong white bread flour',
        measurement_unit_id = 4,
        recipe_id = 1
        )
    ing4 = Ingredient(
        amount = 12,
        food_stuff = 'salt',
        measurement_unit_id = 1,
        recipe_id = 1
        )
    ing5 = Ingredient(
        amount = 100,
        food_stuff = 'sourdough starter',
        measurement_unit_id = 1,
        recipe_id = 2
        )
    ing6 = Ingredient(
        amount = 375,
        food_stuff = 'tepid water',
        measurement_unit_id = 4,
        recipe_id = 2
        )
    ing7 = Ingredient(
        amount = 500,
        food_stuff = 'strong white bread flour',
        measurement_unit_id = 4,
        recipe_id = 2
        )
    ing8 = Ingredient(
        amount = 12,
        food_stuff = 'salt',
        measurement_unit_id = 1,
        recipe_id = 2
        )

    db.session.add(ing1)
    db.session.add(ing2)
    db.session.add(ing3)
    db.session.add(ing4)
    db.session.add(ing5)
    db.session.add(ing6)
    db.session.add(ing7)
    db.session.add(ing8)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_ingredients():
    db.session.execute('TRUNCATE ingredients RESTART IDENTITY CASCADE;')
    db.session.commit()
