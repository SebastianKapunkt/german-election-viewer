import csv
from app.models import Party, Election_Result, Constituency, Federal_State, State


def get_election_results(row, parties):
    index = 3
    results = []

    while index < len(row) - 1:
        first_previsional = 0
        first_period_previsional = 0
        second_previsional = 0
        second_period_previsional = 0

        try:
            if row[index]:
                first_previsional = row[index]
        except IndexError:
            print('row[index]: ' + str(index))

        try:
            if row[index + 1]:
                first_period_previsional = row[index + 1]
        except IndexError:
            print('row[index + 1]: ' + str(index))

        try:
            if row[index + 2]:
                second_previsional = row[index + 2]
        except IndexError:
            print('row[index + 2]: ' + str(index))

        try:
            if row[index + 3]:
                second_period_previsional = row[index + 3]
        except IndexError:
            print('row[index + 3]: ' + str(index))

        result = Election_Result(
            first_previsional=first_previsional,
            first_period_previsional=first_period_previsional,
            second_previsional=second_previsional,
            second_period_previsional=second_period_previsional,
            # it is important that the party has the same order has in the csv
            party=parties[int((index - 3) / 4)]
        )
        results.append(result)
        index += 4
    return results


def get_parties(rows):
    parties = []
    index = 3
    while index < len(rows[2]) - 1:
        parties.append(Party(name=rows[2][index]))
        index += 4
    return parties


def read_csv(state):
    try:
        csv_file = open('btw17_kerg.csv')
        reader = csv.reader(csv_file, delimiter=';')
        rows = list(reader)
        parties = get_parties(rows)
        constituencies = []
        current_federal_state = Federal_State()

        for row in rows:
            try:
                if row[2] == '' and row[0] == '99':  # state it self
                    election_results = get_election_results(row, parties)
                    state.id = row[0]
                    state.name = row[1]
                    state.election_results = election_results
                    print(state)
                elif int(row[2]) in range(17): #constituencies
                    election_results = get_election_results(row, parties)
                    constituencies.append(Constituency(
                        id=row[0],
                        name=row[1],
                        election_results=election_results,
                        federal_state=current_federal_state
                    ))
                elif int(row[2]) == 99:  # federal_state it self
                    election_results = get_election_results(row, parties)
                    current_federal_state.id = row[0]
                    current_federal_state.name = row[1]
                    current_federal_state.election_results = election_results
                    state.federal_states.append(current_federal_state)
                    constituencies = []
                    # print(current_federal_state)
                    current_federal_state = Federal_State()
            except IndexError:
                pass
                # we can ignore this, this are columns that are empty or we don't parse
            except ValueError:
                pass
                # we can ignore this, this are columns that are empty or we don't parse
    finally:
        csv_file.close()

    return state
