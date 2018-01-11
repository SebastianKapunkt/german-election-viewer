from operator import attrgetter

def sort(array):
    to_remove = []
    remaining = ''

    for election in array:
        if election.party.name == "Wahlberechtigte":
            to_remove.append(election)
        if election.party.name == "Wähler":
            to_remove.append(election)
        if election.party.name == "Ungültige":
            to_remove.append(election)
        if election.party.name == "Gültige":
            to_remove.append(election)
        if election.party.name == "Übrige":
            to_remove.append(election)
            remaining = election
    
    for item in to_remove:
        array.remove(item)

    sorted_list = sorted(array, key=lambda x:x.first_previsional, reverse=True)
    sorted_list.append(remaining)

    return sorted_list