import React from 'react';
import Dashboard from './Dashboard';
import DashboardToggle from './Dashboard/DashboardToggle';

export default function Sidebar() {
  return (
      <div className='h-100 pt-2'>
          <div>
              <DashboardToggle />
          </div>
      </div>
  )
}
