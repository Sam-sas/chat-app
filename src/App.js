import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import { Switch, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Homepage from './pages/Homepage';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/sign-in"><SignIn /></PublicRoute>
        <PrivateRoute path="/"><Homepage /></PrivateRoute>
      </Switch>
    </ProfileProvider>
  
  );
}

export default App;
