from app.models import Federal_State, Constituency, Election_Result, Party
from app import helper
from flask import jsonify


class Region_Controller:

    def getElectionResultsForParty(self, constituency_id):
        electorial_results = Election_Result.query.all()
        data_to_sort = []
        final_data = []

        for item in electorial_results:
            if item.constituency_id == constituency_id:
                data_to_sort.append(item)

        sorted_data = helper.sort(data_to_sort)
        
        for item in sorted_data:
            final_data.append(
                {
                    'partyName': item.party.name,
                    'firstPeriodResults': item.first_previsional, 'firstPrePeriodResults': item.first_period_previsional,
                    'secondPeriodResults': item.second_previsional, 'secondPrePeriodResults': item.second_period_previsional
                }
            )

        return jsonify({'data': final_data})

    def getElectionResultsForGeneral(self, constituency_id):
        electorial_results = Election_Result.query.all()
        data_to_handle = []
        final_data = []

        for item in electorial_results:
            if item.constituency_id == constituency_id:
                data_to_handle.append(item)
        
        print('trimmed: ', data_to_handle[:4])

        for item in data_to_handle[:4]:
            final_data.append(
                {
                    'partyName': item.party.name,
                    'firstPeriodResults': item.first_previsional, 'firstPrePeriodResults': item.first_period_previsional,
                    'secondPeriodResults': item.second_previsional, 'secondPrePeriodResults': item.second_period_previsional
                }
            )

        print('final data: ', final_data)

        return jsonify({'data': final_data})
