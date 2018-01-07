from app import db


class Party(db.Model):
    __tablename__ = 'parties'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    def __repr__(self):
        return (
        f'{self.__class__.__name__}('
        f'{self.id},{self.name})'
    )

class Election_Result(db.Model):
    __tablename__ = 'election_results'
    id = db.Column(db.Integer, primary_key=True)
    first_previsional = db.Column(db.Integer)
    first_period_previsional = db.Column(db.Integer)
    second_previsional = db.Column(db.Integer)
    second_period_previsional = db.Column(db.Integer)

    party_id = db.Column(db.Integer, db.ForeignKey('parties.id'))
    party = db.relationship(Party)

    constituency_id = db.Column(db.Integer, db.ForeignKey('constituencies.id'), nullable=True)
    federal_state_id = db.Column(db.Integer, db.ForeignKey('federal_states.id'), nullable=True)
    state_id = db.Column(db.Integer, db.ForeignKey('states.id'), nullable=True)

    def __repr__(self):
        return (
        f'{self.__class__.__name__}('
        f'{self.id},{self.first_previsional},{self.first_period_previsional},{self.second_previsional},{self.second_period_previsional},{self.party!r})'
    )

class Constituency(db.Model):
    __tablename__ = 'constituencies'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    federal_state_id = db.Column(
        db.Integer,
        db.ForeignKey('federal_states.id'),
        nullable=False
    )
    federal_state = db.relationship("Federal_State", back_populates="constituencies")

    election_results = db.relationship('Election_Result', backref='constituency', lazy=True)

    def __repr__(self):
        return (
        f'{self.__class__.__name__}('
        f'{self.id},{self.name},{self.federal_state_id},{self.election_results!r})'
    )


class Federal_State(db.Model):
    __tablename__ = 'federal_states'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    election_results = db.relationship('Election_Result', backref='federal_state', lazy=True)

    constituencies = db.relationship(
        'Constituency',
        lazy=True
    )

    state_id = db.Column(
        db.Integer,
        db.ForeignKey('states.id'),
        nullable=False
    )

    def __repr__(self):
        return (
            f'{self.__class__.__name__}('
            f'{self.id},{self.name},{self.election_results!r},{self.constituencies!r})'
        )

class State(db.Model):
    __tablename__ = 'states'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    federal_states = db.relationship(
        'Federal_State',
        lazy=True
    )

    election_results = db.relationship('Election_Result', backref='state', lazy=True)

    def __repr__(self):
        return (
            f'{self.__class__.__name__}('
            f'{self.id},{self.name},{self.election_results!r},{self.federal_states!r})'
        )
