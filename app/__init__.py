from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config.from_object('app.config')
db = SQLAlchemy(app)

from app import models
db.init_app(app)

from app import db_init
with app.app_context():
    # db.drop_all()
    db.create_all()
    # db_init.init_db()

from app import api

app.run(debug=True)