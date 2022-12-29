import { FriendRequestState } from './friendRequest';
import { MessageState } from './message';
import { ProfileState } from './profile';

export type UserState = {
  isSignedIn: boolean;
  myProfile: ProfileState;
  myFriendRequests: {
    toMe: FriendRequestState[];
    all: FriendRequestState[];
  };
  inbox: MessageState[];
};

export type getUser = {
  id: number;
  email: string;
};

export type postUser = {
  email: string;
  password: string;
};
