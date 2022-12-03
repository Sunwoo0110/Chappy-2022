def main(lst):
    newlist = []
    # Write your code here
    for value in lst:
        if value not in newlist:
            newlist.append(value)
    return newlist
