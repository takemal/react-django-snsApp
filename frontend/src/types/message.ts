export type GetMessage = {
  id: number;
  sendUser: number;
  receiveUser: number;
  text: string;
};

export type PostMessage = {
  receiveUser: number;
  text: string;
};

export type MessageState = {
  id: number;
  sendUser: number | null;
  receiveUser: number | null;
  text: string;
};
