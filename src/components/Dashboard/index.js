import React from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import AvatarUploadButton from './AvatarUploadButton';
import EditableInput from './EditableInput';
import ProviderBlock from './ProviderBlock';

export default function Dashboard({ signOut }) {
    const { profile } = useProfile();
    const onSave = async newData => {

        const userNickNameRef = database.ref(`/profiles/${profile.uid}`).child('name');
    
        try {
            await userNickNameRef.set(newData);
            Alert.success('nickname has been updated', 4000);
        } catch(err) {
            Alert.warning('error!', 4000);
        }
    };

  return (
  <>
      <Drawer.Header>
          <Drawer.Title>
            Dashboard
          </Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
            name="nickname" 
            initialValue={profile.name}
            onSave={onSave}
            label={<h6 className='mb-2'>Nickname</h6>}
        />
        <AvatarUploadButton />
      </Drawer.Body>
      <Drawer.Footer>
          <Button block color='red' onClick={signOut} >Sign Out</Button>
      </Drawer.Footer>
  </>
  );
}
