import argparse
import os
import re
import sys
import json
from bson.objectid import ObjectId

from pymongo import MongoClient

MODE_FEEDBACK = 'feedback'
MODE_HINT = 'hint'
MODES = [
    MODE_FEEDBACK, 
    MODE_HINT
]

parser = argparse.ArgumentParser()
parser.add_argument('--mode', '-m', default='feedback', 
                    choices=MODES, required=True,
                    help="Generation mode for a given program")
parser.add_argument('--target', '-t', default='./code.py', 
                    help="A path of target code from student")
parser.add_argument('--assignment-id', '-a', 
                    required=True,
                    help="A path of target code from student")
args = parser.parse_args()

HOME = os.path.dirname(os.path.dirname(__file__))

class GraFee:
    def __init__(self, code_path, assignment_id):
        self.db = Assignment(id=assignment_id)
        self.assignment = \
            self.db.get_assignment()
        self.testcases = \
            self.db.get_testcases()
        self.code = \
            self.db.get_target_code(code_path)
        self.submissions = \
            self.db.get_submissions()

        # TODO: rm belows
        print(self.assignment)
        print(self.code)
        print('testcases')
        for doc in self.testcases:
            print(doc)
        print('testcases: end')
        print('submissions')
        for doc in self.submissions:
            print(doc)
        print('submissions: end')

    def get_hint(self):
        hint = {
            1: "Remove this Statement",
        }
        print(json.dumps(hint))
        return

    def get_feedback(self):
        return


class Assignment:
    DB_LECTURE = 'lecture'
    DB_SUBMISSION = 'submission'
    CL_ASSIGNMENTS = 'assignments'
    CL_SUBMISSIONS = 'submissions'
    CL_TESTCASES = 'testcases'

    ATTR_ID = '_id'
    ATTR_USER_ID = 'user_id'
    ATTR_REF_ID = 'ref_id'
    ATTR_ASSIGNMENT_ID = 'assignment_id'

    def __init__(self, id) -> None:
        self.id = id
        self.oid = ObjectId(id)
        self.db_uri = self._get_db_uri_from_env_local()
        self.client = MongoClient(self.db_uri)
        self.db_lecture = self.client[self.DB_LECTURE]
        self.db_submission = self.client[self.DB_SUBMISSION]
    
    def get_assignment(self):
        col_assignments = self.db_lecture[self.CL_ASSIGNMENTS]
        query = {
            self.ATTR_ID: self.oid,
            }
        assignment = col_assignments.find_one(query)
        return assignment

    def get_target_code(self, path):
        assert os.path.exists(path)
        code = open(path, errors='ignore').read()
        return code

    def get_testcases(self):
        col_testcases = self.db_lecture[self.CL_TESTCASES]
        query = {
            self.ATTR_ASSIGNMENT_ID: self.oid,
            }
        testcases = col_testcases.find(query)
        return testcases

    def get_submissions(self):
        col_submissions = self.db_submission[self.CL_SUBMISSIONS]
        query = {
            self.ATTR_REF_ID: self.oid,
            }
        submissions = col_submissions.find(query)
        return submissions

    def _get_db_uri_from_env_local(self):
        env_local_path = os.path.join(HOME, '.env.local')
        env_content = open(env_local_path).read()
        
        regex = re.compile(r'MONGODB_URI=\"(.*)\"\n')
        results = re.findall(regex, env_content)
        
        assert len(results) == 1
        db_uri = results[0].replace('/?', f'/{self.DB_LECTURE}?')
        return db_uri




if __name__ == "__main__":
    grafee = GraFee(args.target, args.assignment_id)
    if args.mode == MODE_FEEDBACK:
        output = grafee.get_feedback()
    elif args.mode == MODE_HINT:
        output = grafee.get_hint()
    else:
        raise NotImplementedError()
