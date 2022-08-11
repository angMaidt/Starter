from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[
            DataRequired(message='Please enter a username.'),
            username_exists,
            Length(max=50, message='Username must be less than 50 characters.'),
            Length(min=5, message='Username must be at least 5 characters long.')
            ])
    email = StringField('email', validators=[DataRequired(message='Please enter an email'), user_exists, Email(message='Email must be in format name@example.com')])
    password = StringField('password', validators=[
        DataRequired(message='Please enter a password.'),
        Regexp('/(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/', message='Password must have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long.')
        ])
