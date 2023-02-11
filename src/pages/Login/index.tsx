import React from 'react';
import styles from './index.module.css';
import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../../store';
import { setIsloggedIn } from '../../store/auth/auth.slice';
import { useHistory } from 'react-router';
import * as service   from '../../services/user.service';
// import * as colors from '@mui/material/colors';

export default function Login() {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        const payload = {
            username: data.get('email'),
            password: data.get('password'),
        }
        login(payload);
    };

    const login =  async (payload: any) => {
        try {
            let { data } = await service.login(payload);
            if(data) {
                dispatch(setIsloggedIn(true));
                history.push('/todo');
            }
        } catch(e) {

        }
    }

    return (
        <div className={styles.container}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ bgcolor: '#9c27b0' }}><LockIcon /></Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            '& .MuiTextField-root': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off">
                        <TextField
                            fullWidth
                            required
                            name="email"
                            label="User Name dfdf "
                            type="text"
                        />
                        <TextField
                            fullWidth
                            required
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}