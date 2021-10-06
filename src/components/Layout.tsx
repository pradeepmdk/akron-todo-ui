import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { setIsloggedIn } from '../store/auth/auth.slice';

interface Props {
    children?: any;
}
export default function Layout(props: Props) {
    const history = useHistory();
    const dispatch = useAppDispatch();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" onClick={() => history.push('/todo')} component="div" sx={{ paddingRight: 5, cursor: 'pointer' }}>
                        Todo
                    </Typography>
                    <Typography variant="h6" onClick={() => history.push('/analytics')} component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
                        Analytics
                    </Typography>
                    <Button onClick={() => {
                        dispatch(setIsloggedIn(false));
                        history.push('/');
                    }} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>

            <div>
                {props.children}
            </div>

        </Box>
    );
}