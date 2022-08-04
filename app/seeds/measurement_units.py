from app.models import db, MeasurementUnit


# Adds a demo user, you can add other users here if you want
def seed_measurement_units():
    # metric
    g = MeasurementUnit(
        unit='g',
        system='metric'
        )
    kg = MeasurementUnit(
        unit='kg',
        system='metric'
        )
    l = MeasurementUnit(
        unit='L',
        system='metric'
        )
    ml = MeasurementUnit(
        unit='mL',
        system='metric'
        )

    # imperial
    lb = MeasurementUnit(
        unit='lb',
        system='imperial'
        )
    oz = MeasurementUnit(
        unit='oz.',
        system='imperial'
        )
    gal = MeasurementUnit(
        unit='gal.',
        system='imperial'
        )
    qt = MeasurementUnit(
        unit='qt.',
        system='imperial'
        )
    pt = MeasurementUnit(
        unit='pt.',
        system='imperial'
        )
    c = MeasurementUnit(
        unit='c.',
        system='imperial'
        )
    floz = MeasurementUnit(
        unit='fl.oz.',
        system='imperial'
        )
    tbsp = MeasurementUnit(
        unit='tbsp.',
        system='imperial'
        )
    tsp = MeasurementUnit(
        unit='tsp.',
        system='imperial'
        )



    db.session.add(g)
    db.session.add(kg)
    db.session.add(l)
    db.session.add(ml)
    db.session.add(lb)
    db.session.add(oz)
    db.session.add(gal)
    db.session.add(qt)
    db.session.add(pt)
    db.session.add(c)
    db.session.add(floz)
    db.session.add(tbsp)
    db.session.add(tsp)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_measurement_units():
    db.session.execute('TRUNCATE measurement_units RESTART IDENTITY CASCADE;')
    db.session.commit()
