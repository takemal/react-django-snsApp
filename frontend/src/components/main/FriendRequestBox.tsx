import React, { useState, useContext, useCallback } from 'react';
import { RiMailAddLine } from 'react-icons/ri';
import { IoIosSend } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { FriendRequestState } from '../../types/friendRequest';
import { ProfileState } from '../../types/profile';
import { styled } from '@mui/system';
import { Box, Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../slices/store';
import { asyncCreateMessage } from '../../lib/message';
import { asyncApproveRequest } from '../../lib/friendRequest';

const Button1 = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const IconButton1 = styled(IconButton)(({ theme }) => ({
  color: 'lightgray',
  marginRight: '25px',
  fontSize: 25,
  backgroundColor: 'transparent',
  cursor: 'pointer',
}));

const IconButton2 = styled(IconButton)(({ theme }) => ({
  color: 'gray',
  marginRight: '7px',
  fontSize: 22,
  backgroundColor: 'transparent',
  cursor: 'pointer',
}));

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

type Props = {
  requestToMe: FriendRequestState;
  prof: ProfileState[];
};

export const FriendRequestBox = ({ requestToMe, prof }: Props) => {
  const [open, setOpen] = useState(false);
  const [dmText, setDmText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  //prettier-ignore
  const inputText = useCallback((event: React.ChangeEvent<HTMLInputElement>)=>{
  setDmText(event.target.value)
}, [setDmText])

  const sendDM = () => {
    const message = {
      receiveUser: requestToMe.fromUser!,
      text: dmText,
    };
    dispatch(asyncCreateMessage(message));
    setOpen(false);
  };
  const approveRequest = () => {
    const answer = {
      toUser: requestToMe.toUser!,
      approved: true,
    };
    dispatch(asyncApproveRequest(answer, requestToMe));
  };

  return (
    <li className="list-item">
      <h4> {prof[0].nickName}</h4>
      {!requestToMe.approved ? (
        <Button1 size="small" variant="contained" color="primary" onClick={() => approveRequest()}>
          Approve
        </Button1>
      ) : (
        <IconButton1 onClick={() => setOpen(true)}>
          <RiMailAddLine />
        </IconButton1>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography>Message</Typography>
          <TextField variant="standard" type="text" value={dmText} onChange={inputText} />
          <br />
          <IconButton2 onClick={() => sendDM()}>
            <IoIosSend />
          </IconButton2>
          <IconButton2 onClick={() => setOpen(false)}>
            <IoMdClose />
          </IconButton2>
        </Box>
      </Modal>
    </li>
  );
};
