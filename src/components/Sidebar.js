import React from 'react';
import { Divider } from 'rsuite';
import CreateRoomBtnModal from './Dashboard/CreateRoomBtnModal';
import DashboardToggle from './Dashboard/DashboardToggle';

export default function Sidebar() {
  return (
      <div className='h-100 pt-2'>
          <div>
              <DashboardToggle />
              <CreateRoomBtnModal />
              <Divider>Join Conversation</Divider>
          </div>
      </div>
  )
}
