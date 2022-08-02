from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='demo-san', email='demo@aa.io', password='password')
    prue = User(
        username='prue-leith', email='marnie@aa.io', profile_pic='https://c.files.bbci.co.uk/B724/production/_98548864_pruebest_channel4.jpg', password='password')
    paul = User(
        username='paul-hollywood', email='paul@hollywood.com', profile_pic='https://mmo.aiircdn.com/301/5f0f28467fe71.jpg', password='password')

    db.session.add(demo)
    db.session.add(prue)
    db.session.add(paul)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
