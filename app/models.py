from app import db

class Party(db.Model):
    __tablename__ = 'parties'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

class Election_Result(db.Model):
    __tablename__ = 'election_results'
    id = db.Column(db.Integer, primary_key=True)
    first_previsional = db.Column(db.Integer)
    first_period_previsional = db.Column(db.Integer)
    second_previsional = db.Column(db.Integer)
    second_period_previsional = db.Column(db.Integer)

    area_results = db.relationship("Election_Area_Result", back_populates="result")

    party_id = db.Column(db.Integer, db.ForeignKey('parties.id'))
    party = db.relationship(Party)

class Election_Area(db.Model):
    __tablename__ = 'election_areas'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    area_results = db.relationship("Election_Area_Result", back_populates="area")

class Election_Area_Result(db.Model):
    __tablename__ = 'election_area_result'
    id = db.Column(db.Integer, primary_key=True)
    election_area_id = db.Column(db.Integer, db.ForeignKey('election_areas.id'))
    election_result_id = db.Column(db.Integer, db.ForeignKey('election_results.id'))

    area = db.relationship("Election_Area", back_populates="area_results")
    result = db.relationship("Election_Result", back_populates="area_results")
