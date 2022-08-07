import datetime
from sqlalchemy.sql import func
from .db import db

class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(255), nullable=False, default='https://bewitchingkitchen.files.wordpress.com/2010/11/tartine1.jpg')
    description = db.Column(db.String(2000), nullable=False)
    # note: all times stored in ms
    prep_time = db.Column(db.Integer, nullable=False)
    bake_time = db.Column(db.Integer, nullable=False)
    active_time = db.Column(db.Integer, nullable=False)
    # note: all degrees stored in fahrenheit
    baking_temp = db.Column(db.Integer, nullable=False)
    total_yield = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow, onupdate=func.now())

    #relationships
    user = db.relationship('User', back_populates='recipes', foreign_keys=[user_id])
    instructions = db.relationship('Instruction', back_populates='recipe', cascade="all, delete")
    ingredients = db.relationship('Ingredient', back_populates='recipe', cascade="all, delete")
    comments = db.relationship('Comment', back_populates='recipe', cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'user': self.user.to_dict(),
            'title': self.title,
            'image_url': self.image_url,
            'description': self.description,
            'prep_time': self.prep_time,
            'bake_time': self.bake_time,
            'active_time': self.active_time,
            'baking_temp': self.baking_temp,
            'total_yield': self.total_yield,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'instructions': [instruction.to_dict() for instruction in self.instructions],
            'ingredients': [ingredient.to_dict() for ingredient in self.ingredients],
            'comments': [comment.to_dict() for comment in self.comments]
        }
