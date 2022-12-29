export const apiUrl = process.env.REACT_APP_APIURL;

// 最後に/をいれる
export const userCreatesURL = `${apiUrl}api/user/create/`;
export const userProfilesURL = `${apiUrl}api/user/profile/`;
export const userProfileURL = (profileId: string | number) => `${apiUrl}api/user/profile/${profileId}/`;
export const userMyprofilesURL = `${apiUrl}api/user/myprofile/`;
export const userApprovalsURL = `${apiUrl}api/user/approval/`;
export const userApprovalURL = (approvalId: string | number) => `${apiUrl}api/user/approval/${approvalId}/`;
export const dmInboxURL = `${apiUrl}api/dm/inbox/`;
export const dmMessagesURL = `${apiUrl}api/dm/message/`;
export const authURL = `${apiUrl}authen/`;

// NoImage画像
export const noImageURL = `${apiUrl}media/images/NoImage.png`;
