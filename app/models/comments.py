from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    body = db.Column(db.String(750), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    #relationships
    recipe = db.relationship('Recipe', back_populates='comments')
    user = db.relationship('User', back_populates='comments')
