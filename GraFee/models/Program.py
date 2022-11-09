import ast

from bson.objectid import ObjectId

import config as conf
from constant import standardize_methods as std_methods
from models.TestSuite import TestSuite
from utils.AST import FunctionDefVisitor
from utils.CodeRunner import CodeRunner

class Program:
    def __init__(self, 
                 code:str, uuid:ObjectId=None) -> None:
        self.uuid:ObjectId = uuid
        
        self.code:str = code
        self._ast:ast.AST = None
        self.syntax_error:SyntaxError = None
        
        self.fixed_code:str = None
        self._fixed_ast:ast.AST = None
        self.fixed_syntax_error:SyntaxError = None
        
        self.standardized_code:str = None
        self.feedback:dict = None
        self.hint:dict = None

        try:
            self._ast = ast.parse(self.code)
        except SyntaxError as e:
            self.syntax_error = e
        except Exception as e:
            raise e
        
    @property
    def fixed_ast(self) -> ast.AST:
        return self._fixed_ast

    @property
    def ast(self) -> ast.AST:
        return self._ast
    

    @property
    def has_target_function_name(self) -> bool:
        return conf.TARGET_FUNC_NAME in self.get_function_names()

    @property
    def has_syntax_errors(self) -> bool:
        return self.syntax_error is not None

    @property
    def is_standardized(self) -> bool:
        return self.standardized_code is not None
    
    @property
    def is_fixed(self) -> bool:
        return self.fixed_code is not None

    def set_fixed_code(self, fixed_code:str) -> None:
        self.fixed_code = fixed_code
        try:
            self._fixed_ast = ast.parse(self.fixed_code)
        except SyntaxError as e:
            self.fixed_syntax_error = e
        except Exception as e:
            raise e


    def get_function_names(self) -> list[str]:
        if self._ast is None:
            return None
        
        function_names = \
            FunctionDefVisitor().traverse(self._ast).function_names
        return function_names
        
    def standardize(self) -> None:
        method = conf.methods.standardize
        if method == std_methods.none:
            std_code = self.code
        elif method == std_methods.all:
            raise NotImplementedError
        else:
            raise NotImplementedError
        
        self.standardized_code = std_code

    def test(self, 
             testsuite:TestSuite,
             fixed_code:bool=False) -> TestSuite:
        '''Run the code with test_input, expected_out'''

        # TODO: Static test

        # Dynamic test
        test_results = CodeRunner(
            program=self, 
            testsuite=testsuite, 
            fixed_code=fixed_code).run(0.5)

        return test_results
