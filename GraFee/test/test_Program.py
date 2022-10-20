import ast
import pytest
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import config as conf
from constant import standardize_methods as std_methods
from models.Program import Program
from utils.AST import FunctionDefVisitor, compare_ast

@pytest.fixture
def code_1() -> str:
    return '''\
from time import sleep
def main(lst):
    print('a' + \
        'b')
    if lst == '[1': a = 3
    else:
        b = 7
        lst = '3]'
    #sleep(5)
    foo()
    return lst
def m(lst):
    print(lst)
    lst = '3]'
    for elem in lst:
        print(elem)
    return lst
def foo():
    a=[]
    if True:
        print('hi')
    while len(a) < 4:
        a.append(1)
        m(a)
    return a
# main([])
'''

@pytest.fixture
def code_2() -> str:
    return '''\
def main(lst):
    print('a' + \
        'b')
    if lst == '[1': a = 3
    else:
        b = 7
        lst = '3]'
    return lst
main([])
'''

@pytest.fixture
def ast_1(code_1) -> ast.AST:
    return ast.parse(code_1)

@pytest.fixture
def ast_2(code_2) -> ast.AST:
    return ast.parse(code_2)

@pytest.fixture
def function_defs_ast_1(ast_1) -> ast.AST:
    visitor = FunctionDefVisitor()
    visitor.visit(ast_1)
    return visitor.function_defs

@pytest.fixture
def function_defs_ast_2(ast_2) -> ast.AST:
    visitor = FunctionDefVisitor()
    visitor.visit(ast_2)
    return visitor.function_defs

@pytest.fixture
def function_names_ast_1(function_defs_ast_1):
    return [ node.name for node in function_defs_ast_1 ]

@pytest.fixture
def function_names_ast_2(function_defs_ast_2):
    return [ node.name for node in function_defs_ast_2 ]

@pytest.fixture
def program(code_1) -> Program:
    return Program(code_1)

def test_ast_1(program, ast_1):
    assert compare_ast(program.ast, ast_1)

def test_ast_2(program, ast_2):
    assert not compare_ast(program.ast, ast_2)

def test_standardize_1(program):
    conf.methods.standardize = \
        std_methods.none
    program.standardize()
    assert program.code == program.standardized_code

@pytest.mark.skip("Not implemented yet")
def test_standardize_2(program):
    conf.methods.standardize = \
        std_methods.all
    program.standardize()

def test_get_function_names(
    program, function_names_ast_1, function_names_ast_2):
    assert program.get_function_names() == function_names_ast_1
    assert program.get_function_names() != function_names_ast_2
