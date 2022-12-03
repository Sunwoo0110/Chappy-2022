def main(lst):
    newlist = []
    for value in lst:
        if value not in newlist:
            newlist.append(value)
    return newlist
    