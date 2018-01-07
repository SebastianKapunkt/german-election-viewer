from flask import session
from app import db
from app.models import State
import election_reader

def init_db():
    state = State()
    state = election_reader.read_csv(state)
    db.session.add(state)
    db.session.commit()