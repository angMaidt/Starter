from app.models import db, Recipe


# Adds a demo user, you can add other users here if you want
def seed_recipes():
    bread1 = Recipe(
        user_id = 3,
        title = 'Paul Hollywood\'s Famous Sourdough',
        description = 'Master baker Paul Hollywood\'s famous sourdough bread, fluffy and oh so flavorful. Deserves a handshake of it\'s own.',
        prep_time = 1200000,
        bake_time = 1800000,
        active_time = 1200000,
        baking_temp = 225,
        total_yield = '1 loaf'
        )
    bread2 = Recipe(
        user_id = 2,
        title = 'Prue Leith\'s Famous Sourdough',
        description = 'Master baker Prue Leith\'s famous sourdough bread, fluffy and oh so flavorful. Simply delightful.',
        prep_time = 1200000,
        bake_time = 1800000,
        active_time = 1200000,
        baking_temp = 225,
        total_yield = '1 loaf'
        )

    db.session.add(bread1)
    db.session.add(bread2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_recipes():
    db.session.execute('TRUNCATE recipes RESTART IDENTITY CASCADE;')
    db.session.commit()
