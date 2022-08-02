from .db import db

class MeasurementUnit(db.Model):
    __tablename__ = 'measurement_units'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)

    #relationships
    ingredient = db.Column('Ingredient', back_populates='units')
