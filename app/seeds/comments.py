from app.models import db, Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():

    c1 = Comment(
        rating = 5,
        body = 'Loved this recipe! Came together very well, next time goin to coat with a seed mix for some extra crunch, yum.',
        user_id = 2,
        recipe_id = 1
        )
    c2 = Comment(
        rating = 2,
        body = 'Had a hard time following, turned into a disc. Back to the drawing board I guess :p',
        user_id = 3,
        recipe_id = 1
        )
    c3 = Comment(
        rating = 4,
        body = 'Loved this recipe! Came together very well, next time goin to coat with a seed mix for some extra crunch, yum.',
        user_id = 3,
        recipe_id = 2
        )
    c4 = Comment(
        rating = 2,
        body = 'Had a hard time following, turned into a disc. Back to the drawing board I guess :p',
        user_id = 2,
        recipe_id = 2
        )

    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
