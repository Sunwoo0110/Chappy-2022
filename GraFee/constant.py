from argparse import Namespace

standardize_methods = \
    Namespace(
        none='none',
        all='all',
    )

reference_search_methods = \
    Namespace(
        answers='answers',
        first_answer='first_answer',
        most_similar_answer='most_similar_answer',
        correct_submissions='correct_submissions',
        first_correct_submission='first_correct_submission',
        most_similar_correct_submission='most_similar_correct_submission',
        all='all',
    )

repair_methods = \
    Namespace(
        use_reference='use_reference',
    )

feedback_methods = \
    Namespace(
        compare_with_answer='compare_with_answer',
    )


### TEST ###
test_code_1 = '''\
from time import sleep
def main(lst):
    print('a' + \
        'b')
    if lst == '[1': a = 3
    else:
        b = 7
        lst = '3]'
    #sleep(5)
    foo()
    return lst
def m(lst):
    print(lst)
    lst = '3]'
    for elem in lst:
        print(elem)
    return lst
def foo():
    a=[]
    if True:
        print('hi')
    while len(a) < 4:
        a.append(1)
        m(a)
    return a
# main([])
'''