import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncCreateFriendRequest } from '../../lib/friendRequest';
import { AppDispatch } from '../../slices/store';
import { FriendRequestState } from '../../types/friendRequest';
import { ProfileState } from '../../types/profile';

type Props = {
  profileData: ProfileState;
  reqData: FriendRequestState[];
};

export const Profile = (props: Props) => {
  const { profileData, reqData } = props;
  const dispatch = useDispatch<AppDispatch>();
  const newRequest = () => {
    const requestData = {
      toUser: profileData.user!,
    };
    dispatch(asyncCreateFriendRequest(requestData));
  };

  return (
    <Card sx={{ position: 'relative', display: 'flex', marginBottom: 10 }}>
      {profileData.img ? (
        <CardMedia sx={{ minWidth: 100 }} image={profileData.img} />
      ) : (
        <CardMedia sx={{ minWidth: 100 }} image="http://127.0.0.1:8000/media/image/NoImage.png" />
      )}

      <CardContent sx={{ padding: 5 }}>
        <Typography variant="h6">{profileData.nickName}</Typography>
        <Typography>{profileData.created_at!.toLocaleString()}</Typography>
        {!reqData[0] ? (
          <Button size="small" sx={{ gap: 1 }} variant="contained" color="primary" onClick={() => newRequest()}>
            Ask as friend
          </Button>
        ) : (
          <Button size="small" sx={{ gap: 1 }} variant="contained" color="primary" disabled>
            Ask as friend
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
