class Testcase:
    def __init__(self, testnum:int, input:str, expects:str):
        self.testnum:int = testnum
        self.input:str = input
        self.expects:str = expects
        self.output:str = None
        self.error:str = None
        self.trace:str = None
    
    def __str__(self) -> str:
        stdout = f'Testcase#{self.testnum}\n' + \
        f'  In : {self.input}\n' + \
        f'  Exp: {self.expects}\n'
        if self.output is not None:
            stdout += \
                f'  Out: {self.output}\n' + \
                f'  is_pass: {self.is_pass}'
        if self.error is not None:
            stdout += \
                f'  Err: {self.error}\n'

        return stdout

    def reset(self) -> None:
        self.output:str = None
        self.error:str = None
        self.trace:str = None

    @property
    def is_pass(self) -> bool:
        if self.output is None:
            return None
        return self.expects == self.output


class TestSuite(dict):
    def __init__(self, header:str):
        self.header = header
        super()

    def __setitem__(self, key:int, value:Testcase):
        super().__setitem__(key, value)

    @property
    def is_all_passed(self) -> bool:
        return all([testcase.is_pass for testcase in self.values()])

    @property
    def is_tested(self) -> bool:
        for testcase in self.values():
            if testcase.output is not None:
                return True
        return False
    
    @property
    def count_passes(self) -> int:
        if self.is_all_passed:
            return len(self)
        return [testcase.is_pass for testcase in self.values()].count(True)
    
    @property
    def count_fails(self) -> int:
        if self.is_all_passed:
            return 0
        return len(self) - self.count_passes
    
    @property
    def result(self) -> dict:
        result_dict = {}
        for tc_no, testcase in self.items():
            result_dict[tc_no] = (testcase.input, testcase.expects, testcase.output)
        return result_dict

    def sorted_testnums(self) -> list[int]:
        return sorted(self.keys())
    
    def sorted_testcases(self) -> list[Testcase]:
        return [self[testnum] for testnum in self.sorted_testnums()]
