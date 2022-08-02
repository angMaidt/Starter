from .db import db
import datetime

class Recipe(db.Model):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(255), nullable=False, default='https://bewitchingkitchen.files.wordpress.com/2010/11/tartine1.jpg')
    description = db.Column(db.String(2000), nullable=False)
    prep_time = db.Column(db.Integer, nullable=False)
    bake_time = db.Column(db.Integer, nullable=False)
    active_time = db.Column(db.Integer, nullable=False)
    baking_temp = db.Column(db.Integer, nullable=False)
    total_yield = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    #relationships
    user = db.relationship('User', back_populates='recipes')
    instructions = db.relationship('Instruction', back_populates='recipe')
    ingredients = db.relationship('Ingredient', back_populates='recipe')
    comments = db.relationship('Comment', back_populates='recipe', cascade="all, delete")
