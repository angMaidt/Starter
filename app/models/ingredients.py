from .db import db

class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    food_stuff = db.Column(db.String(50), nullable=False)
    measurement_unit_id = db.Column(db.Integer, db.ForeignKey('measurement_units.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    #relationships
    recipe = db.relationship('Recipe', back_populates='ingredients')
    units = db.relationship('MeasurementUnit', back_populates='ingredient')
