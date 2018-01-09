from operator import attrgetter

def sort(array):
    toRemove = []
    for election in array:
        if election.party.name == "Wahlberechtigte":
            toRemove.append(election)
        if election.party.name == "Wähler":
            toRemove.append(election)
        if election.party.name == "Ungültige":
            toRemove.append(election)
        if election.party.name == "Gültige":
            toRemove.append(election)
    
    for item in toRemove:
        array.remove(item)

    sortedList = sorted(array, key=lambda x:x.first_previsional, reverse=True)

    return sortedList
