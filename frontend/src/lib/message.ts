import { Action, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { fetchEndAction, fetchStartAction } from '../slices/fetchStateSlice';
import { RootState } from '../slices/store';
import { setInboxAction } from '../slices/userSlice';
import { PostMessage } from '../types/message';
import { dmInboxURL, dmMessagesURL } from '../urls';

const cookies = new Cookies();

// DM作成
export const asyncCreateMessage = (postData: PostMessage) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('メッセージ送信中'));
    return await axios
      .post(dmMessagesURL, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(fetchEndAction());
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

export const asyncGetInbox = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('メッセージ取得中'));
    return await axios
      .get(dmInboxURL, {
        headers: {
          Authorization: `Token ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setInboxAction(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
