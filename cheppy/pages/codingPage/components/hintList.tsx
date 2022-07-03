

const getHint = async() => {
    const hints = {"2":[{"Delete":"this statement"}, {"Insert":"'if' statement"}], "3":[{"Insert":"'Return' statement"}]};    
    const lines = Object.keys(hints);
    
    const listItem = lines.map((line) => (
        // let contents = hints[line];    

        <List key={line.toString()} disablePadding>
            <ListItem>
                <Grid container sx={{ml:3, mt:2}}>
                    <Grid item width="15%">
                        <Box sx={{backgroundColor: "#FFD600", borderRadius: 1}}>
                            <ListItemText>
                                <Typography align="center" fontWeight='bold' fontSize={15}>{line}</Typography>
                            </ListItemText> 
                        </Box>
                    </Grid>
                    <Grid item width="75%">
                        <ListItemText>
                            <Typography fontSize={13} style={{ marginLeft: "5%" }}>Replace Return value</Typography>
                        </ListItemText>
                    </Grid>
                </Grid>
            </ListItem>
        </List>
    ));

    return listItem;

    // const listItem = lines.map((line)=>
    //     // <li key={line.toString()}>{line}</li>
    //     <Typography key={line.toString()} align="center" fontWeight='bold' fontSize={15}>{line}</Typography>
    // );
    
    // return(
        //     <Typography align="center" fontWeight='bold' fontSize={15}>{listItem}</Typography>  
    // );

    // await axios.post('http://localhost:4000/feedback/hint', {
        //         code: editorRef.current.getValue()
    //     })
    //     .then((res) => {
    //         console.log("success");
    //         console.log(res.data.result);
    //         resultChanger(res.data.result);
    //     })
    //     .catch(error => {
    //         console.log("failed");
    //         console.log(error.response)
    //     })
}

export default hintList
