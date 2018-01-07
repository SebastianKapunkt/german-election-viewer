import os
import json

from app import app
from flask import jsonify, send_from_directory

from app.models import Federal_State, Constituency, Election_Result, Party

BASE_URL = os.path.abspath(os.path.dirname(__file__))
CLIENT_APP_FOLDER = os.path.join(BASE_URL, "../WebApp")


@app.route('/api/states', methods=['GET'])
def states():
    states_data = []
    all_states = Federal_State.query.all()

    for state in all_states:
        states_data.append({'id': state.id, 'name': state.name})

    return jsonify({'data': states_data})


@app.route('/api/states/<int:federal_state_id>/constituencies', methods=['GET'])
def constituencies(federal_state_id):
    all_constituencies = Constituency.query.filter_by(
        federal_state_id=federal_state_id).all()
    constituencies_data = []

    for constituency in all_constituencies:
        constituencies_data.append(
            {'id': constituency.id, 'name': constituency.name})

    return jsonify({'data': constituencies_data})


@app.route('/api/constituency/<int:constituency_id>/electorial_results')
def electorial_results(constituency_id):
    electorial_results = Election_Result.query.all()
    electorial_result_data = []
    for result in electorial_results:
        if result.constituency_id == constituency_id:
            electorial_result_data.append(
                {
                    'partyName': result.party.name,
                    'firstPeriodResults': result.first_previsional, 'firstPrePeriodResults': result.first_period_previsional,
                    'secondPeriodResults': result.second_previsional, 'secondPrePeriodResults': result.second_period_previsional
                }
            )

    return jsonify({'data': electorial_result_data})


@app.route('/api/parties')
def parties():
    all_parties = Party.query.all()

    return jsonify(all_parties)

#-----File server


# Catch All urls, enabling copy-paste url
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')  # Catch All urls, enabling copy-paste url
def home(path):
    return send_from_directory(CLIENT_APP_FOLDER, 'index.html')


@app.route('/client-app/<path:filename>')
def client_app_folder(filename):
    return send_from_directory(CLIENT_APP_FOLDER, filename)


@app.route('/dist/<path:filename>')
def client_app_app_folder(filename):
    return send_from_directory(os.path.join(CLIENT_APP_FOLDER, "dist"), filename)
