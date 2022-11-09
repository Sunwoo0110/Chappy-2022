import os
from argparse import Namespace

import constant as const

methods = Namespace(
    standardize=const.standardize_methods.none,
    reference_search=const.reference_search_methods.first_answer,
    repair=const.repair_methods.use_reference,
    feedback=const.feedback_methods.compare_with_answer,
)

HOME = os.path.abspath(os.curdir)
TARGET_FUNC_NAME = 'main'
db_uri = 'mongodb+srv://baek:0125@cluster0.5fcuysg.mongodb.net/?retryWrites=true&w=majority'