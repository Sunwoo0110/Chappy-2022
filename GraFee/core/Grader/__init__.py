
from bson import ObjectId

import config as conf
from constant import reference_search_methods as search_methods
from models.Program import Program
from models.TestResults import TestResults
from utils.Database import Database

import argparse
import json
import os
import ast
import textwrap
import re
import multiprocessing as mp

from cognitive_complexity.api import get_cognitive_complexity

def grade(test_results, submission, reference):
    func_score = functionality(test_results)
    effic_score, loc_score, rw_score, cf_score, df_score = efficiency(submission, reference)
    readable_score, err_msg_list = readabilty(submission)

    return func_score, effic_score, loc_score, rw_score, cf_score, df_score, readable_score, err_msg_list

    

def functionality(test_results):
    # 기능 점수
    return (test_results.count_passes/len(test_results)) * 100

def efficiency(submission, reference):
    # 효율 점수

    def get_effic_score(target_file):
        multimetric_ = os.popen('multimetric '+target_file)
        multimetric_result = multimetric_.read()
        multimetric_.close

        multimetric_data = json.loads(multimetric_result)
        #print(type(multimetric_data))
        loc_score = multimetric_data.get('overall', {}).get('loc')
        rw_score = multimetric_data.get('overall', {}).get('halstead_volume')
        cf_score = multimetric_data.get('overall', {}).get('cyclomatic_complexity')

        with open(target_file, 'r') as f:
            stmt_list = f.readlines()
        code = ''.join(stmt_list)
        funcdef = ast.parse(code).body[0]
        df_score = get_cognitive_complexity(funcdef)

        # print("The LOC is:" + str(loc_score))
        # print("The Halstead Volume is: " + str(rw_score))
        # print("The Cyclomatic Complexity is: " + str(cf_score))
        # print('The cognitive complexity is:{}'.format(df_score))

        return int(loc_score), int(rw_score), int(cf_score), int(df_score)

    def calc_effic_score(sub_socre, ref_score, sep_point):
        score = sep_point
        if sub_socre < ref_score:
            score = sub_score * sep_point / ref_score
        return int(score)

    score_list = []
    sub_score_list = get_effic_score(submission)
    ref_score_list = get_effic_score(reference)
    sep_point = 100 / len(sub_score_list)
    for sub_score, ref_score in zip(sub_score_list, ref_score_list):
        score = calc_effic_score(sub_score, ref_score, sep_point)
        score_list.append(score)
    
    loc_score, rw_score, cf_score, df_score = score_list
    effic_score = loc_score + rw_score + cf_score + df_score
    return effic_score, loc_score, rw_score, cf_score, df_score
    

def readabilty(target_file):
     # 가독성 점수
    pylint_ = os.popen('pylint '+target_file)
    pylint_result = pylint_.read()
    pylint_.close

    pylint_result_list = pylint_result.splitlines()
    readable_score = pylint_result_list[-2]

    readable_score_find = re.findall('Your code has been rated at (.*?)\/10 \(previous', readable_score)
    if readable_score_find:
        readable_score = float(readable_score_find[0]) * 10

    # print('Readable Score is: %s' %readable_score)
    err_msg_list = []
    for message in pylint_result_list[1:-1]:
        if message.strip():
            if target_file+':' in message:
                _, lineno, _, err_msg = message.split(':', maxsplit=3)
                
                msg = "Line %s: '%s'" %(lineno, err_msg)
                err_msg_list.append(msg)
    
    return int(readable_score), err_msg_list