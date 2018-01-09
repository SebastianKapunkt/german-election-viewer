from operator import attrgetter

def sort(array):
    result = []
    for i in range(0, 4):
        result.append(array[i])

    sorted_part = array[:4]+sorted(array[4:len(array)], key=lambda item: item.first_previsional)
    result.append(sorted_part)

    print('result: ', result);
    return result
