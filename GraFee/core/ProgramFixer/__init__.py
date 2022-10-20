
import config as conf
from constant import repair_methods

def fix(program, reference, test_results):
    method = conf.methods.repair
    if method == repair_methods.use_reference:
        program.set_fixed_code(reference.code)
    else:
        raise NotImplementedError
    assert program.fixed_code is not None

    new_test_result = program.test(test_results, fixed_code=True)

    return program, new_test_result