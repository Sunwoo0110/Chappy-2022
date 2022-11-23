def main(lst):
    new_lst = []
    for elem in lst:
        if elem not in new_lst:
            new_lst.append(elem)
    return new_lst
print(main([1,2,3,3,3,3,3,3]))