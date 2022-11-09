import ast
from contextlib import redirect_stdout
from io import StringIO
from os import linesep
from signal import ITIMER_REAL, SIGALRM, alarm, signal, setitimer
from sys import settrace

from models.TestSuite import TestSuite


class CodeRunner:
    def __init__(self, 
                 program, 
                 testsuite:TestSuite,
                 fixed_code:bool=False) -> None:
        self.program = program
        self.testsuite = testsuite
        self.fixed_code = fixed_code
        self.trace_log = ''

    def run(self, timeout=1.) -> TestSuite:
        for testcase in self.testsuite.sorted_testcases():
            testcase.reset()

            # Synthesize the target code to test
            test_code = self.synthesis_test_code()

            # Prepare the target code
            _global = {}
            _local = {}
            try:
                exec(test_code, _global, _local)
            except Exception as e:
                testcase.error = e
                continue
            
            # Set the timeout handler
            class TimeoutError(Exception):
                pass
            def timeout_handler(signum, frame):
                settrace(None)
                raise TimeoutError(f'[TimeoutError] {timeout}')
            
            # Run test input
            result_variable_name = 'result'
            test_input = f'{result_variable_name} = {testcase.input}'
            stdout = StringIO()
            with redirect_stdout(stdout):
                try:
                    signal(SIGALRM, timeout_handler)
                    setitimer(ITIMER_REAL, timeout)
                    settrace(self.my_tracer)
                    exec(test_input, _global, _local)
                    settrace(None)
                except TimeoutError as e:
                    testcase.error = e
                except Exception as e:
                    settrace(None)
                    testcase.error = e
                finally:
                    settrace(None)
                    alarm(0)
            
            if testcase.error is not None:
                continue

            stdout_raw = stdout.getvalue()

            # Update test results
            if stdout_raw.strip() == '':
                testcase.output = str(_local[result_variable_name])
            else:
                testcase.output = stdout.getvalue()

            if testcase.output is not None:
                testcase.trace = self.trace_log

        return self.testsuite

    def synthesis_test_code(self):
        if self.fixed_code:
            base_code = self.program.fixed_code[:]
            base_ast = self.program.fixed_ast
        else:
            base_code = self.program.code[:]
            base_ast = self.program.ast

        # Leave the functions only
        assert isinstance(base_ast, ast.Module), \
            f'The root node of the AST should be Module type: {type(base_ast)}'

        new_body = []
        for node in base_ast.body:
            if isinstance(node, ast.FunctionDef):
                new_body.append(node)
        base_ast.body = new_body 
        base_code = ast.unparse(base_ast)

        # Insert global test code
        if self.testsuite.header is not None:
            base_code = self.testsuite.header + linesep + base_code
 

        return base_code

    def my_tracer(self, frame, event, arg=None):
        # extracts calling function name
        func_name = frame.f_code.co_name
        if func_name.startswith('_'):
            return self.my_tracer

        line_no = frame.f_lineno
        self.trace_log += f"{event}> {func_name}():{line_no} {frame.f_locals}"
        # print(log)

        return self.my_tracer

