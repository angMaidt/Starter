from app.models import db, MeasurementUnit


# Adds a demo user, you can add other users here if you want
def seed_measurement_units():
    # metric
    g = MeasurementUnit(
        unit='g'
        )
    kg = MeasurementUnit(
        unit='kg'
        )
    l = MeasurementUnit(
        unit='L'
        )
    ml = MeasurementUnit(
        unit='mL'
        )

    # imperial
    oz = MeasurementUnit(
        unit='oz.'
        )
    floz = MeasurementUnit(
        unit='fl.oz.'
        )
    tsp = MeasurementUnit(
        unit='tsp.'
        )
    tbsp = MeasurementUnit(
        unit='tbsp.'
        )
    c = MeasurementUnit(
        unit='c.'
        )
    pt = MeasurementUnit(
        unit='pt.'
        )
    qt = MeasurementUnit(
        unit='qt.'
        )
    gal = MeasurementUnit(
        unit='gal.'
        )
    lb = MeasurementUnit(
        unit='lb'
        )



    db.session.add(g)
    db.session.add(kg)
    db.session.add(l)
    db.session.add(ml)
    db.session.add(oz)
    db.session.add(floz)
    db.session.add(tsp)
    db.session.add(tbsp)
    db.session.add(c)
    db.session.add(pt)
    db.session.add(qt)
    db.session.add(gal)
    db.session.add(lb)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_measurement_units():
    db.session.execute('TRUNCATE measurement_units RESTART IDENTITY CASCADE;')
    db.session.commit()
