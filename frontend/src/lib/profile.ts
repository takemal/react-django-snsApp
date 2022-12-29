import { Action, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { fetchEndAction, fetchStartAction } from '../slices/fetchStateSlice';
import { deleteProfileAction, setProfilesAction } from '../slices/profileSlice';
import { RootState } from '../slices/store';
import { resetMyprofileAction, setMyprofileAction } from '../slices/userSlice';
import { PostProfile } from '../types/profile';
import { userMyprofilesURL, userProfilesURL, userProfileURL } from '../urls';

const cookies = new Cookies();

// 自分のプロフィール取得
export const asyncGetMyProfile = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('プロフィール取得中'));
    await axios
      .get(userMyprofilesURL, {
        headers: {
          Authorization: `Token ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(setMyprofileAction(res.data[0]));
        dispatch(fetchEndAction());
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// プロフィール作成
export const asyncCreateProfile = (postData: PostProfile) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('プロフィール作成中'));
    const uploadData = new FormData();
    uploadData.append('nickName', postData.nickName);
    postData.img && uploadData.append('img', postData.img, postData.img.name);
    console.log(`Token ${cookies.get('Token')}`);
    return await axios
      .post(userProfilesURL, uploadData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(setMyprofileAction(res.data));
        dispatch(fetchEndAction());
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// プロフィール更新
export const asyncUpdateMyProfile = (postData: PostProfile) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('プロフィール更新中'));
    const myProfile = getState().user.myProfile;
    const uploadData = new FormData();
    uploadData.append('nickName', postData.nickName);
    postData.img && uploadData.append('img', postData.img, postData.img.name);
    return await axios
      .put(userProfileURL(myProfile.id!), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(setMyprofileAction(res.data));
        dispatch(fetchEndAction());
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// プロフィール削除
export const asyncDeleteMyProfile = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('プロフィール削除中'));
    const myProfile = getState().user.myProfile;
    return await axios
      .delete(userProfileURL(myProfile.id!), {
        headers: {
          Authorization: `Token ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(resetMyprofileAction());
        dispatch(deleteProfileAction(myProfile.id));
        dispatch(fetchEndAction());
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

//プロフィール全件取得
export const asyncGetProfiles = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    return await axios
      .get(userProfilesURL, {
        headers: {
          Authorization: `Token ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(setProfilesAction(res.data));
      })
      .catch((e) => console.log(e));
  };
};
