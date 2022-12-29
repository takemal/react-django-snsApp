import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../slices/store';
import { asyncLogout } from '../../lib/auth';
import { selectUser } from '../../slices/userSlice';
import { selectProfiles } from '../../slices/profileSlice';

export const Navbar = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const friendRequestsToMe = useSelector(selectUser).myFriendRequests.toMe;
  const profiles = useSelector(selectProfiles);

  const logout = () => {
    dispatch(asyncLogout()).then(() => navigate('/'));
  };

  const notApprovedNumber = friendRequestsToMe.filter((req) => {
    return (
      req.approved === false &&
      profiles.filter((prof) => {
        return prof.user === req.fromUser;
      })
    );
  }).length;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            SNS APP
          </Typography>
          <Badge sx={{ marginRight: 2 }} badgeContent={notApprovedNumber} color="secondary">
            <NotificationsIcon />
          </Badge>
          <button className="text-2xl cursor-pointer" onClick={() => logout()}>
            <FiLogOut />
          </button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
