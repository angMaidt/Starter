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
    unit = db.relationship('MeasurementUnit', back_populates='ingredient')

    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'food_stuff': self.food_stuff,
            'measurement_unit': self.unit.to_dict(),
            # 'recipe': self.recipe.to_dict()
        }
