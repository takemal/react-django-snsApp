import { Action, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { fetchEndAction, fetchStartAction } from '../slices/fetchStateSlice';
import { RootState } from '../slices/store';
import { initialUserState, setUserInfoAction, signOutAction } from '../slices/userSlice';
import { authURL, userCreatesURL } from '../urls';
import { asyncGetMyProfile } from './profile';

const cookies = new Cookies();

// アカウント登録
export const asyncSignUp = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('アカウント登録中'));
    await axios
      .post(
        userCreatesURL,
        { email: email, password: password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((res) => {
        dispatch(fetchEndAction());
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// ログイン
export const asyncSignIn = (email: string, password: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(fetchStartAction('ログイン中'));
    await axios
      .post(
        authURL,
        { username: email, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        cookies.set('Token', res.data.token, { path: '/' });
        dispatch(
          setUserInfoAction({
            isSignedIn: true,
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};

export const asyncLogout = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('ログアウト中'));
    cookies.remove('Token');
    dispatch(signOutAction());
    dispatch(fetchEndAction());
  };
};
