import { Action, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { fetchEndAction, fetchStartAction } from '../slices/fetchStateSlice';
import { RootState } from '../slices/store';
import {
  addMyFriendRequestAction,
  setRequestsAboutMeAction,
  setRequestsToMeAction,
  updateRequestToMeAction,
} from '../slices/userSlice';
import { FriendRequestState, GetFriendRequest, PostFriendRequest, PutFriendRequest } from '../types/friendRequest';
import { userApprovalsURL, userApprovalURL } from '../urls';

const cookies = new Cookies();

// 自分宛の友達申請リスト取得
export const asyncGetFriendRequestToMe = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const uid = getState().user.myProfile.user;
    return await axios
      .get(userApprovalsURL, {
        headers: {
          Authorization: `Token ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        const friendRequestToMe = res.data.filter((friendRequest: GetFriendRequest) => {
          return uid === friendRequest.toUser;
        });
        dispatch(setRequestsToMeAction(friendRequestToMe));
      })
      .catch((e) => {
        console.log(e);
      });
    dispatch(fetchEndAction());
  };
};

// 新規友達申請
export const asyncCreateFriendRequest = (postData: PostFriendRequest) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    dispatch(fetchStartAction('友達申請中'));
    return await axios
      .post(userApprovalsURL, postData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(addMyFriendRequestAction(res.data));
        dispatch(fetchEndAction());
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// 自分に関わる友達申請リストを全て取得
export const asyncGetAllFriendRequest = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    return await axios
      .get(userApprovalsURL, {
        headers: {
          Authorization: `Token ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        dispatch(setRequestsAboutMeAction(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};

// 自分宛の友達申請を承認
// 自分が承認すると相手も承認したことにする
export const asyncApproveRequest = (answer: PutFriendRequest, request: FriendRequestState) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const toMeRequests = getState().user.myFriendRequests.toMe;
    const allMyRequest = getState().user.myFriendRequests.all;
    const uid = getState().user.myProfile.id;
    return await axios
      .put(userApprovalURL(request.id!), answer, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${cookies.get('Token')}`,
        },
      })
      .then((res) => {
        const updateToMeRequest = toMeRequests.map((toMe) => {
          if (toMe.id === request.id) {
            return res.data;
          }
          return toMe;
        });
        dispatch(updateRequestToMeAction(updateToMeRequest));

        // 反転リクエストが存在するかどうかで条件分岐
        const ReverseRequest = allMyRequest.filter((eachRequest) => {
          return eachRequest.fromUser === uid && eachRequest.toUser === request.fromUser;
        });
        if (!ReverseRequest[0]) {
          // 存在しないなら新規作成
          let newRequest = {
            toUser: request.fromUser,
            approved: true,
          };
          axios.post(userApprovalsURL, newRequest, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${cookies.get('Token')}`,
            },
          });
        } else {
          // 存在するなら更新
          let newRequest = {
            toUser: request.fromUser,
            fromUser: request.toUser,
            approved: true,
          };
          axios.put(userApprovalURL(ReverseRequest[0].id!), newRequest, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${cookies.get('Token')}`,
            },
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
