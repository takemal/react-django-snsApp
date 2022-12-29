import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

// ユーザー情報の初期化
export const initialFetchState = {
  loading: {
    isLoading: false,
    text: '',
  },
  getErr: '',
};

export const fetchStateSlice = createSlice({
  name: 'fetchState',
  initialState: initialFetchState,
  reducers: {
    fetchStartAction: (state, action) => {
      return {
        ...state,
        loading: {
          isLoading: true,
          text: action.payload,
        },
      };
    },
    fetchEndAction: (state) => {
      return {
        ...state,
        loading: {
          isLoading: false,
          text: '',
        },
      };
    },
    getErrAction: (state, action) => {
      state.getErr = action.payload;
    },
  },
});

export const fetchStateReducer = fetchStateSlice.reducer;
export const { fetchEndAction, fetchStartAction, getErrAction } = fetchStateSlice.actions;

// state情報をそのままとる
export const selectFetchState = (state: RootState) => state.fetchState;
