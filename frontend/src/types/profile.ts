export type GetProfile = {
  id: number;
  user: number;
  nickName: string;
  img: string;
  created_at: Date;
};

export type PostProfile = {
  nickName: string;
  img: File | null;
};

export type ProfileState = {
  id: number | null;
  user: number | null;
  nickName: string;
  img: string;
  created_at: Date | null;
};
