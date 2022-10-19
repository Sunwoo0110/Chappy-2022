
from bson import ObjectId

import config as conf
from constant import reference_search_methods as search_methods
from models.Program import Program
from models.TestResults import TestResults
from utils.Database import Database


def search(database:Database,
           submission:Program,
           test_results:TestResults,
           assignment_id:ObjectId=None,) -> Program:
    references = []
    selected_reference = None

    # Load answer programs & submissions
    method = conf.methods.reference_search
    if method == search_methods.first_answer:
        answer_code = database.get_answer_code(assignment_id)
        references += [Program(answer_code)]
    else:
        raise NotImplementedError(
            f'ReferenceSearchMethod: {method}')

    assert len(references) > 0, \
        f'[ReferenceNotFound] There are no references to use.'

    # TODO: Select a reference
    if len(references) > 1:
        print(f'{method}: More than one references exists. Use first one.')
    selected_reference = references[0]
    
    return selected_reference

def load_answers(limit=None) -> list[Program]:
    return []

def load_correct_submissions(limit=None) -> list[Program]:
    return []