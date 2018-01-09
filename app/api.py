import os
import json

from flask import jsonify, send_from_directory
from app import app, helper
from app import region_controller, state_controller

BASE_URL = os.path.abspath(os.path.dirname(__file__))
CLIENT_APP_FOLDER = os.path.join(BASE_URL, "../WebApp")


@app.route('/api/states', methods=['GET'])
def states():
    return state_controller.getStates()


@app.route('/api/states/<int:federal_state_id>/constituencies', methods=['GET'])
def constituencies(federal_state_id):
    return state_controller.getConstituencies(federal_state_id)


@app.route('/api/constituency/<int:constituency_id>/party_election_results')
def electorial_results_party(constituency_id):
    return region_controller.getElectionResultsForParty(constituency_id)


@app.route('/api/constituency/<int:constituency_id>/general_election_results')
def electorial_results_general(constituency_id):
    return region_controller.getElectionResultsForGeneral(constituency_id)

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
