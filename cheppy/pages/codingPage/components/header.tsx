import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const Header = () =>{

    function HomeIcon(props: SvgIconProps) {
        return (
            <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
        );
    }

    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar style={{ background: '#60656e', minHeight: '50px' }}>
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            >
            <HomeIcon color="inherit" />
            </IconButton>
            <Box sx={{ width: 1000}} alignItems="center">
                <Box  sx={{ bgcolor: 'background.paper', borderRadius: 1 }} >
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="center" style={{color: 'black' }}>
                    duplicate elimination
                    </Typography>
                </Box>
            </Box>
        </Toolbar>
        </AppBar>
    </Box>
    );
}
export default Header