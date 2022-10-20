import config as conf

from core import ProgramFixer
from models.Feedback import Feedback
from models.Program import Program
from models.TestSuite import TestSuite

def generate(program:Program, reference:Program, test_results:TestSuite):
    fixed_program, test_results = ProgramFixer.fix(program, reference, test_results)
    program_with_feedback = \
        Feedback(fixed_program, test_results).generate()
    return program_with_feedback, test_results
