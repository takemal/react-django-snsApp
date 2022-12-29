import React from 'react';
import { RiUserReceivedLine } from 'react-icons/ri';
import { MessageState } from '../../types/message';
import { ProfileState } from '../../types/profile';

type Props = {
  dm: MessageState;
  prof: ProfileState[];
};

export const InboxDM = ({ dm, prof }: Props) => {
  return (
    <li className="list-item">
      {prof[0] && <h4>{dm.text}</h4>}
      {prof[0] && (
        <h4>
          <RiUserReceivedLine className="badge" />
          {prof[0].nickName}
        </h4>
      )}
    </li>
  );
};
