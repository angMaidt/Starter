from .db import db

class Instruction(db.Model):
    __tablename__ = 'instructions'

    id = db.Column(db.Integer, primary_key=True)
    list_order = db.Column(db.Integer, nullable=False)
    specification = db.Column(db.String(1000), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    #relationships
    recipe = db.relationship('Recipe', back_populates='instructions')

    def to_dict(self):
        return {
            'id': self.id,
            'list_order': self.list_order,
            'specification': self.specification,
            # 'recipe': self.recipe.to_dict()
        }
