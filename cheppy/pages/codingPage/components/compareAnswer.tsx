import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/modules';

const CompareAnswer = () =>{
    const codeValue = useSelector((state: RootState) => state.code);
    // style needs to be fixed
    const newStyles = {
        variables: {
          light: {
            codeFoldGutterBackground: "#6F767E",
            codeFoldBackground: "#E2E4E5"
          }
        }
      };
    
    return(
        <>
            <Box sx={{width: '25vw'}}>
                <Box sx={{ height: 40, backgroundColor: "#414E5A", pt:1.2}}>
                    <Typography fontWeight='bold' fontSize={15} style={{ marginLeft: "3%", color: 'white'}}>답안비교</Typography>
                </Box>
            </Box>

            {/* scroll needed */}
            <Box sx={{width: '25vw'}}>
                <ReactDiffViewer
                    oldValue={codeValue.originStr}
                    newValue={codeValue.curStr}
                    splitView={false}
                    compareMethod={DiffMethod.LINES}
                    styles={newStyles}
                    // leftTitle="Version A"
                    // rightTitle="Version B"
                    // renderContent={highlightSyntax}
                />
            </Box>
        </>
    )

}

export default CompareAnswer