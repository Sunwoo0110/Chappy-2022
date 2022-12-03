import argparse
from bson import ObjectId
import os
import json

import constant as const
import config as conf
from core import FeedbackGenerator
from core import ReferenceFinder
from core import Grader
from models.Program import Program
from models.TestSuite import TestSuite
from utils.Logger import logger
from utils.Database import Database

MODE_FEEDBACK = 'feedback'
MODE_HINT = 'hint'
MODES = [
    MODE_FEEDBACK,
    MODE_HINT
]

parser = argparse.ArgumentParser()
parser.add_argument('--mode', '-m', default='hint',
                    required=True,
                    help="Generation mode for a given program")
parser.add_argument('--target', '-t', default='code.py',
                    help="A path of target code from student")
parser.add_argument('--assignment_id', '-a',
                    required=True,
                    help="A path of target code from student")
parser.add_argument('--code', '-c',
                    help="A code of target program from student")

args = parser.parse_args()

HOME = os.path.dirname(os.path.dirname(__file__))

if __name__ == "__main__":
    # configuration
    database = Database(conf.db_uri)
    assignment_id = ObjectId(args.assignment_id)
    code_file = args.target

    # Prepare the target Program
    if args.code:
        code = args.code
    else:
        code = open(code_file).read()
    program = Program(code)

    # Validate the program
    if program.has_syntax_errors:
        error = program.syntax_error
        lineno = error.lineno
        colno = error.offset-1
        print(
            f'The program has syntax error(s):\n' +
            f'{error}\n' +
            f'{lineno} |{code.splitlines()[lineno-1]}\n' +
            f'{" "*len(str(lineno))} |{" "*colno}^')
        exit()
    elif not program.has_target_function_name:
        print(f'The program need a function named "{conf.TARGET_FUNC_NAME}"')
        exit()

    # Run test suite
    testsuite: TestSuite = \
        database.get_testsuite(assignment_id)
    test_results = program.test(testsuite)

    if args.mode == 'grade':
        # If the program passes all the test cases,
        # terminate the process
        if not test_results.is_tested:
            print('TestSuite does not tested at all.')
            exit()
        # elif test_results.is_all_passed:
        #     print('The program passes all the test cases')
        #     exit()

        ## 기존
        # if test_results.count_fails != 0:
        #     print('오답!')
        # else:
        #     print('정답!')
        # print('Test results> ' +
        #     f'total: {len(test_results)},' +
        #     f'pass: {test_results.count_passes}, ' + 
        #     f'fail: {test_results.count_fails}'
        #     )
        # print(json.dumps(test_results.result))
        
        ## json 형식으로 변경
        if test_results.count_fails != 0:
            print("[" + json.dumps({"result": False}) + ",")
        else:
            print("[" + json.dumps({"result": True})+ ",")
        print(json.dumps({"test": { 
            "total": len(test_results), 
            "pass": test_results.count_passes, 
            "fail": test_results.count_fails}}) + ",")
        print(json.dumps(test_results.result) + "]")
        
    elif args.mode == 'hint':
        # Find the related references
        reference = \
            ReferenceFinder.search(
                database=database,
                submission=program,
                test_results=test_results,
                assignment_id=assignment_id)
        assert reference is not None

        # Generate the feedback
        program_with_feedback, new_test_results = \
            FeedbackGenerator.generate(program, reference, test_results)
        assert new_test_results.is_all_passed

        print(json.dumps(program_with_feedback.hint))
    
    elif args.mode == 'submit':
        reference = \
            ReferenceFinder.search(
                database=database,
                submission=program,
                test_results=test_results,
                assignment_id=assignment_id)
        assert reference is not None

        refer_file = 'GraFee/reference.py'
        with open(refer_file, 'w') as w:
            w.write(reference.code)

        # func_point, effic_point, read_point
        func_score, \
        effic_score, loc_score, rw_score, cf_score, df_score, \
        readable_score, err_msg_list = \
        Grader.grade(test_results, code_file, refer_file)

        submit_result = {}
        submit_result['Functional'] = {
            'score' : func_score,
            'msg' : test_results.result
        }
        submit_result['Efficiency'] = {
            'score' : effic_score,
            'Line of code' : loc_score,
            'Reservation Word' : rw_score,
            'Control Flow' : cf_score,
            'Data Flow' : df_score
        }
        submit_result['Readability'] = {
            'score' : readable_score,
            'msg' : err_msg_list
        }
        
        print(json.dumps(submit_result))

