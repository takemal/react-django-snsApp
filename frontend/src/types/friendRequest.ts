export type GetFriendRequest = {
  id: number;
  toUser: number;
  fromUser: number;
  approved: boolean;
};

export type PostFriendRequest = {
  toUser: number;
};

//アンサー
export type PutFriendRequest = {
  toUser: number;
  approved: boolean;
};

export type FriendRequestState = {
  id: number | null;
  toUser: number | null;
  fromUser: number | null;
  approved: boolean;
};
