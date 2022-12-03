import difflib
from io import StringIO
from keyword import iskeyword
from tokenize import generate_tokens
from models.Program import Program


class Feedback:
    OP_NOT_CHANGED = '  '
    OP_DELETE = '- '
    OP_INSERT = '+ '
    OP_DELTA = '? '
    OP_UPDATE = '! '

    def __init__(self, program, test_results):
        self.program = program
        self.test_results = test_results

    def generate(self) -> Program:
        self.program.feedback = self.make_feedback()
        self.program.hint = self.make_hint()
        return self.program
    
    def make_hint(self) -> dict:
        hint = {}
        target_code:str = self.program.code
        base_code:str = self.program.fixed_code

        # Get diff
        lines = [line
            for line in difflib.Differ().compare(
                target_code.splitlines(), 
                base_code.splitlines())]

        line_num = 1
        while len(lines) > 0:
            line = lines.pop(0).replace('\n', '')
            operation, line = (line[:2], line[2:])
            meta = None

            if operation == self.OP_INSERT:
                meta = line
            elif operation == self.OP_DELETE and len(lines) > 0:
                next_operations = []
                for _line in lines:
                    next_operations.append(_line[:2])
                    if len(next_operations) == 3:
                        break
                
                if next_operations == [self.OP_DELTA, self.OP_INSERT, self.OP_DELTA]:
                    meta = [lines.pop(0) for _ in range(3)][1]
                elif len(next_operations) > 2 and next_operations[:2] == [self.OP_INSERT, self.OP_DELTA]:
                    meta = [lines.pop(0) for _ in range(2)][0]
                
                if next_operations[0] == self.OP_DELETE:
                    operation = self.OP_DELETE
                else:
                    operation = self.OP_UPDATE

            hint_message = self.make_hint_message(operation, line, meta)
            
            if hint_message.strip():
                if line_num not in hint:
                    hint[line_num] = []
                hint[line_num].append(hint_message)
            
            if operation != self.OP_INSERT:
                line_num += 1
        return hint

    def make_hint_message(self, operation, line, meta=None):
        if operation == self.OP_NOT_CHANGED:
            return ''
        elif operation == self.OP_DELETE:
            return f'DELETE this line.'
        
        hint = ': Write a statement without using reserved keywords(i.e., for, return).'
        if meta is not None:
            tokens = generate_tokens(StringIO(meta).readline)
            for token in tokens:
                if iskeyword(token.string):
                    hint = f": '{token.string}' statement should be here."
                    break

        if operation == self.OP_INSERT:
            return f'INSERT a line' + hint
        elif operation == self.OP_UPDATE:
            return f'UPDATE this line' + hint
        else:
            raise NotImplementedError(f'{operation}|{line}')

    def make_feedback(self) -> dict:
        return {}
    