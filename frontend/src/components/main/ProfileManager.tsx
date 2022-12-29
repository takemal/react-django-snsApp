import React, { useCallback, useContext, useState } from 'react';
import { BsPersonCheckFill } from 'react-icons/bs';
import { MdAddAPhoto } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import { BsPersonPlus } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import { noImageURL } from '../../urls';
import { IconButton, TextField } from '@mui/material';
import { asyncCreateProfile, asyncDeleteMyProfile, asyncUpdateMyProfile } from '../../lib/profile';
import { AppDispatch } from '../../slices/store';
import { LocationOn } from '@mui/icons-material';
import { styled } from '@mui/system';

const IconButton1 = styled(IconButton)(({ theme }) => ({
  padding: 0,
  color: 'lightgray',
  marginLeft: '10px',
  fontSize: 20,
  backgroundColor: 'transparent',
}));

export const ProfileManager = () => {
  // const classes = useStyles();
  const [nickName, setNickName] = useState('');
  const [img, setImg] = useState<File | null>(null);
  const myProfile = useSelector(selectUser).myProfile;
  const dispatch = useDispatch<AppDispatch>();

  //prettier-ignore
  const inputNickName = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
    setNickName(event.target.value)
  }, [setNickName])

  return (
    <div>
      <div className="text-center relative mx-1.5">
        <img
          src={myProfile?.img ? myProfile.img : noImageURL}
          alt="profile"
          className="w-[150px] h-[150px] mx-auto object-cover max-w-full rounded-[50%] bg-white"
        />
        <IconButton
          sx={{ position: 'absolute', top: '70%', left: '80%' }}
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            id="imageInput"
            type="file"
            onChange={(e) => {
              setImg(e.target.files![0]);
              e.target.value = '';
            }}
          />
          <MdAddAPhoto className="photo" />
        </IconButton>
      </div>

      {myProfile?.id ? (
        <IconButton1
          sx={{ cursor: nickName && img ? 'pointer' : 'none' }}
          disabled={!nickName}
          onClick={() => dispatch(asyncUpdateMyProfile({ nickName, img }))}
        >
          <FaUserEdit />
        </IconButton1>
      ) : (
        <IconButton1
          sx={{ cursor: nickName && img ? 'pointer' : 'none' }}
          disabled={!nickName || !img}
          onClick={() => dispatch(asyncCreateProfile({ nickName, img }))}
        >
          <BsPersonPlus />
        </IconButton1>
      )}
      <IconButton1 sx={{ cursor: 'pointer' }} onClick={() => dispatch(asyncDeleteMyProfile())}>
        <BsTrash />
      </IconButton1>

      <div className="text-center">
        <div className="flex justify-center">
          <BsPersonCheckFill className="bg-transparent text-gray-200 mr-2 text-xl" />
          {myProfile && <div className="text-gray-300 font-Neue align-middle text-md">{myProfile?.nickName}</div>}
        </div>
        <div className="h-1" />
        <input type="text" value={nickName} name="nickName" onChange={inputNickName} />
        <div className="h-1" />
        <span className="text-gray-200 text-sm">Joined at {myProfile?.created_at?.toLocaleString()} </span>
        <div className="h-1" />
        <LocationOn sx={{ color: 'lightgray' }} /> <span className="text-sm text-gray-200">JAPAN</span>
      </div>
    </div>
  );
};
