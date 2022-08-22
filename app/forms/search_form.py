from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
# from wtforms.validators import DataRequired,

class SearchForm(FlaskForm):
    search_term = StringField('Search Term')
