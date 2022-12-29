import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { asyncGetAllFriendRequest } from '../lib/friendRequest';
import { asyncGetMyProfile, asyncGetProfiles } from '../lib/profile';
import { selectProfiles } from '../slices/profileSlice';
import { AppDispatch } from '../slices/store';
import { selectUser } from '../slices/userSlice';
import { FriendRequestBox } from './main/FriendRequestBox';
import { Profile } from './main/Profile';
import { ProfileManager } from './main/ProfileManager';
import { GoMail } from 'react-icons/go';
import { InboxDM } from './main/DMBox';
import { BsFillPeopleFill } from 'react-icons/bs';

export const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profiles = useSelector(selectProfiles);
  const myprofile = useSelector(selectUser).myProfile;
  const requestsToMe = useSelector(selectUser).myFriendRequests.toMe;
  const allMyFriendReq = useSelector(selectUser).myFriendRequests.all;
  const inbox = useSelector(selectUser).inbox;
  const filteredProfiles = profiles.filter((prof) => {
    return prof.id !== myprofile?.id;
  });

  const listProfiles =
    filteredProfiles &&
    filteredProfiles.map((prof) => (
      <Profile
        key={prof.id}
        profileData={prof}
        reqData={allMyFriendReq.filter((req) => {
          return prof.user === req.fromUser || prof.user === req.toUser;
        })}
      />
    ));

  useEffect(() => {
    dispatch(asyncGetProfiles());
  }, []);

  return (
    <Grid container>
      <Grid item xs={4}>
        <div className="app-profiles">
          <div className="task-list">{listProfiles}</div>
        </div>
      </Grid>

      <Grid item xs={4}>
        <div className="app-details">
          <ProfileManager />
        </div>
        <h3 className="title-ask">
          {' '}
          <BsFillPeopleFill className="badge" />
          Approval request list
        </h3>
        <div className="app-details">
          <div className="task-list">
            <ul>
              {myprofile.id &&
                requestsToMe.map((request) => (
                  <FriendRequestBox
                    key={request.id}
                    requestToMe={request}
                    prof={profiles.filter((profile) => {
                      return profile.user === request.fromUser;
                    })}
                  />
                ))}
            </ul>
          </div>
        </div>
      </Grid>

      <Grid item xs={4}>
        <h3>
          <GoMail className="badge" />
          DM Inbox
        </h3>
        <div className="app-dms">
          <div className="task-list">
            <ul>
              {myprofile.id &&
                inbox.map((dm) => (
                  <InboxDM
                    key={dm.id}
                    dm={dm}
                    prof={profiles.filter((prof) => {
                      return prof.user === dm.sendUser;
                    })}
                  />
                ))}
            </ul>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
