import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../types/user';
import { RootState } from './store';

export const initialUserState: UserState = {
  isSignedIn: false,
  myProfile: {
    id: null,
    user: null,
    nickName: '',
    img: '',
    created_at: null,
  },
  myFriendRequests: {
    toMe: [],
    all: [],
  },
  inbox: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    //ユーザ情報(auth用)
    setUserInfoAction: (state, action) => {
      return { ...state, ...action.payload };
    },
    //ログアウト
    signOutAction: (state) => {
      return initialUserState;
    },
    // プロフィール
    setMyprofileAction: (state, action) => {
      return { ...state, myProfile: action.payload };
    },
    resetMyprofileAction: (state) => {
      return { ...state, myProfile: initialUserState.myProfile };
    },
    // 友達申請した時
    addMyFriendRequestAction: (state, action) => {
      return {
        ...state,
        myFriendRequests: {
          toMe: [...state.myFriendRequests.toMe],
          all: [...state.myFriendRequests.all, action.payload],
        },
      };
    },
    // 自分宛の承認リスト取得
    setRequestsToMeAction: (state, action) => {
      state.myFriendRequests.toMe = action.payload;
    },
    // 自分に関わる申請リスト取得
    setRequestsAboutMeAction: (state, action) => {
      state.myFriendRequests.all = action.payload;
    },
    // 承認時(おきかえ)
    updateRequestToMeAction: (state, action) => {
      state.myFriendRequests.toMe = action.payload;
    },
    // DM取得
    setInboxAction: (state, action) => {
      state.inbox = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const {
  setMyprofileAction,
  resetMyprofileAction,
  addMyFriendRequestAction,
  setUserInfoAction,
  signOutAction,
  setRequestsAboutMeAction,
  setRequestsToMeAction,
  updateRequestToMeAction,
  setInboxAction,
} = userSlice.actions;

// state情報をそのままとる
export const selectUser = (state: RootState) => state.user;
