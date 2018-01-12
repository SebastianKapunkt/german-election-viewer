from app.models import Federal_State, Constituency
from flask import jsonify

class State_Controller:

    def getStates(self):
        states_data = []
        all_states = Federal_State.query.all()

        for state in all_states:
            states_data.append({'id': state.id, 'name': state.name})

        return jsonify({'data': states_data})

    def getConstituencies(self, federal_state_id):
        all_constituencies = Constituency.query.filter_by(federal_state_id=federal_state_id).all()
        constituencies_data = []

        for constituency in all_constituencies:
            constituencies_data.append(
                {'id': constituency.id, 'name': constituency.name})

        return jsonify({'data': constituencies_data})
