import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { asyncLogout, asyncSignIn, asyncSignUp } from '../lib/auth';
import { useDispatch, useSelector } from 'react-redux';
import { selectFetchState } from '../slices/fetchStateSlice';
import { AppDispatch } from '../slices/store';
import { asyncGetMyProfile } from '../lib/profile';
import { asyncGetAllFriendRequest, asyncGetFriendRequestToMe } from '../lib/friendRequest';
import { asyncGetInbox } from '../lib/message';

export const Login = () => {
  const isLoading = useSelector(selectFetchState).loading.isLoading;
  const [loginMode, setLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const inputEmail = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const authSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loginMode) {
      await dispatch(asyncSignIn(email, password));
      await dispatch(asyncGetMyProfile());
      await dispatch(asyncGetAllFriendRequest());
      await dispatch(asyncGetFriendRequestToMe());
      await dispatch(asyncGetInbox());
      navigate('/profiles');
    } else {
      await dispatch(asyncSignUp(email, password));
      setLoginMode(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <button className="text-2xl cursor-pointer" onClick={() => dispatch(asyncLogout())}>
        a
      </button> */}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {isLoading && <CircularProgress />}
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {loginMode ? 'Login' : 'Register'}
        </Typography>

        <Box component="form" onSubmit={(e) => authSubmit(e)} noValidate sx={{ mt: 1 }}>
          {loginMode ? (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                name="username"
                autoFocus
                value={email}
                onChange={inputEmail}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={inputPassword}
              />
            </>
          ) : (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                autoFocus
                value={email}
                onChange={inputEmail}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={inputPassword}
              />
            </>
          )}
          {/* <span className="flex flex-col align-middle mt-w.5 text-red-500">{error}</span> */}

          {loginMode ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              disabled={!password || !email}
            >
              Login
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="primary"
              disabled={!password || !email}
            >
              Register
            </Button>
          )}

          <span onClick={() => setLoginMode(!loginMode)} className="flex flex-col items-center text-blue-400 ">
            {loginMode ? 'Create Account ?' : 'Back to login ?'}
          </span>
        </Box>
      </Box>
    </Container>
  );
};
