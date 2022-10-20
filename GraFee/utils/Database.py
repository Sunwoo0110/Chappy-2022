import json
from pprint import pprint
from bson.objectid import ObjectId
from argparse import Namespace

from pymongo import MongoClient
import pymongo

from models.TestSuite import TestSuite, Testcase


class Database:
    # Database names
    DB_LECTURE: str = 'lecture'
    DB_SUBMISSION: str = 'submission'

    # Collection names on DB_LECTURE
    COL_ASSIGNMENTS: str = 'assignments'
    COL_TESTCASES: str = 'testcases'

    # Collection names on DB_SUBMISSION
    COL_SUBMISSIONS: str = 'submissions'
    COL_FEEDBACKS: str = 'feedbacks'
    COL_GRADES: str = 'grades'

    def __init__(self, db_uri):
        self.db_uri = db_uri
        self.client = MongoClient(db_uri)
        # print(self.client.list_database_names())

    def get_assignment(self, assignment_id):
        collection = \
            self.client[self.DB_LECTURE][self.COL_ASSIGNMENTS]
        query = {'_id': ObjectId(assignment_id)}
        assignment = collection.find_one(query)
        if assignment is None:
            return None
        return Namespace(**assignment)

    def get_answer_code(self, assignment_id):
        assignment = self.get_assignment(assignment_id)
        if assignment is None:
            return None
        return assignment.reference_code

    def get_submissions(self, assignment_id):
        collection = \
            self.client[self.DB_SUBMISSION][self.COL_SUBMISSIONS]
        query = {'ref_id': ObjectId(assignment_id)}
        submissions = []
        for submission in collection.find(query):
            submissions.append(Namespace(**submission))
        return submissions

    def get_submissions_by_user(self, assignment_id, user_id):
        collection = \
            self.client[self.DB_SUBMISSION][self.COL_SUBMISSIONS]
        query = {
            'ref_id': ObjectId(assignment_id),
            'user_id': ObjectId(user_id),
        }
        submissions = []
        for submission in collection.find(query):
            submissions.append(Namespace(**submission))
        return submissions

    def get_code(self, submission_id):
        collection = \
            self.client[self.DB_SUBMISSION][self.COL_SUBMISSIONS]
        query = {'_id': ObjectId(submission_id)}
        submission = collection.find_one(query)
        if submission is None:
            return None
        return submission['user_code']

    def get_grade(self, submission_id):
        collection = \
            self.client[self.DB_SUBMISSION][self.COL_GRADES]
        query = {'submission_id': ObjectId(submission_id)}
        grade = collection.find_one(query)
        return Namespace(**grade)

    def get_testsuite(self, assignment_id:ObjectId):
        collection = \
            self.client[self.DB_LECTURE][self.COL_TESTCASES]
        query = {'assignment_id': assignment_id}

        testsuite = TestSuite(header=None)
        for testcase in collection.find(query)\
                .sort('testnumber', pymongo.ASCENDING):
            testnum = int(testcase['testnumber'])
            testsuite[testnum] = \
                Testcase(
                    testnum=testnum,
                    input=testcase['input'],
                    expects=testcase['output'])

        return testsuite


if __name__ == "__main__":
    import os
    import sys
    sys.path.append(os.path.dirname(os.path.dirname(__file__)))
    import config as conf
    from models.TestSuite import TestSuite, Testcase
    db = Database(conf.db_uri)
    assignment_id = '6300f814d273cf05e1cc975d'
    assignment = db.get_assignment(assignment_id)
    pprint(assignment.title)
    submissions = db.get_submissions(assignment_id)
    pprint(submissions)
    submission_id = '63010ae6d273cf05e1cc978a'
    grade = db.get_grade(submission_id)
    pprint(grade)
