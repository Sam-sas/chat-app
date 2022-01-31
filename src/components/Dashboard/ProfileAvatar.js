import React from 'react';
import { Avatar } from 'rsuite';
import { getNameInitials } from '../../misc/helpers';

export default function ProfileAvatar({ name, ...avatarProps }) {
  return (
      <Avatar circle {...avatarProps}>
          {
            getNameInitials(name)
          }
      </Avatar>
  );
}
