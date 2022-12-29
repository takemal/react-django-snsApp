import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { dmInboxURL } from '../urls';
import { RootState } from './store';

// ユーザー情報の初期化
export const initialMessageState = {
  inbox: [],
};

const cookies = new Cookies();

export const messageSlice = createSlice({
  name: 'Message',
  initialState: initialMessageState,
  reducers: {
    setInboxAction: (state, action) => {
      return { ...state, inbox: action.payload };
    },
  },
});

export const messageReducer = messageSlice.reducer;
export const { setInboxAction } = messageSlice.actions;

// state情報をそのままとる
export const selectMessage = (state: RootState) => state.message;
