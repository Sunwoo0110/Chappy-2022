
import ast
from typing import Any


def compare_ast(node1, node2):
    '''ref: https://stackoverflow.com/a/19598419'''
    if type(node1) is not type(node2):
        return False
    if isinstance(node1, ast.AST):
        for k, v in vars(node1).items():
            if k in ('lineno', 'col_offset', 'ctx'):
                continue
            if not compare_ast(v, getattr(node2, k)):
                return False
        return True
    elif isinstance(node1, list):
        return all(compare_ast(n1, n2) for n1, n2 in zip(node1, node2))
    else:
        return node1 == node2


class FunctionDefVisitor(ast.NodeVisitor):
    def __init__(self):
        super()
        self.function_defs = []

    def traverse(self, node: ast.AST) -> list:
        self.visit(node)
        return self
    
    @property
    def function_names(self):
        return [ node.name for node in self.function_defs ]

    def visit_FunctionDef(self, node: ast.FunctionDef) -> Any:
        self.function_defs.append(node)
        ast.NodeVisitor.generic_visit(self, node)
