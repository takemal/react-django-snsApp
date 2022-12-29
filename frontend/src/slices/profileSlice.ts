import { createSlice } from '@reduxjs/toolkit';
import { ProfileState } from '../types/profile';
import { RootState } from './store';

export const initialProfilesState: ProfileState[] = [];

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfilesState,
  reducers: {
    setProfilesAction: (state, action) => {
      return [...action.payload];
    },
    deleteProfileAction: (state, action) => {
      return state.filter((profile) => profile.id !== action.payload);
    },
  },
});

export const profilesReducer = profileSlice.reducer;
export const { deleteProfileAction, setProfilesAction } = profileSlice.actions;

// state情報をそのままとる
export const selectProfiles = (state: RootState) => state.profiles;
