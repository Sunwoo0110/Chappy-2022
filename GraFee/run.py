import argparse
from bson import ObjectId
import os
import json

import constant as const
import config as conf
from core import FeedbackGenerator
from core import ReferenceFinder
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
                    choices=MODES, required=True,
                    help="Generation mode for a given program")
parser.add_argument('--target', '-t', default='code.py',
                    help="A path of target code from student")
parser.add_argument('--assignment-id', '-a',
                    required=True,
                    help="A path of target code from student")
args = parser.parse_args()

HOME = os.path.dirname(os.path.dirname(__file__))

if __name__ == "__main__":
    # configuration
    database = Database(conf.db_uri)
    assignment_id = ObjectId(args.assignment_id)

    # Prepare the target Program
    code = open(args.target).read()
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

    # If the program passes all the test cases,
    # terminate the process
    if not test_results.is_tested:
        print('TestSuite does not tested at all.')
        exit()
    elif test_results.is_all_passed:
        print('The program passes all the test cases')
        exit()

    """ print('Test results> ' +
        f'pass: {test_results.count_passes}, ' + 
        f'fail: {test_results.count_fails}, ' + 
        f'total: {len(test_results)}') """

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
