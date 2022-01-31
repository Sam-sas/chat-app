import React from "react";
import { useState } from "react/cjs/react.development";
import { Alert, Button, Icon, Tag } from "rsuite";
import firebase from 'firebase/app';
import { auth } from "../../misc/firebase";

export default function ProviderBlock() {
  const [isConnected, setConnected] = useState({
    "google.com": auth.currentUser.providerData.some(
      (data) => data.providerId === "google.com"
    ),
    "facebook.com": auth.currentUser.providerData.some(
      (data) => data.providerId === "facebook.com"
    ),
  });

  const updateIsConnected = (providerId, value) => {
    setConnected(p => {
        return {
            ...p,
            [providerId]:value,
        }
    })
  }

  const unlink = async (providerId) => {
    try{
        if(auth.currentUser.providerData.length === 1) {
            throw new Error(`You cannot disconnect from ${providerId}`);
        }

        await auth.currentUser.unlink(providerId);
        updateIsConnected(providerId, false);
        Alert.info(`disconnected from ${providerId}`, 4000);
    } catch(err) {
        Alert.error(err.message, 4000);
    }
  };

  const link = async (provider) => {
    try{
        await auth.currentUser.linkWithPopup(provider);
        Alert.info(`Connected with ${provider}`, 4000);
        updateIsConnected(provider.providerId, true);

    } catch(err) {
        Alert.error(err.message, 4000);
    }
  };

  const unlinkFacebook = () => {
      unlink('facebook.com');
  };
  const linkFacebook = () => {
      link(new firebase.auth.FacebookAuthProvider());
  };
  const unlinkGoogle = () => {
    unlink('google.com');
  };
  const linkGoogle = () => {
      link(new firebase.auth.GoogleAuthProvider());
  };

  console.log(auth.currentUser);
  return (
    <div>
      {isConnected["google.com"] && (
        <Tag color="green" closable  onClose={unlinkGoogle}>
          <Icon icon="google" /> Connected
        </Tag>
      )}
      {isConnected["facebook.com"] && (
        <Tag color="blue" closable onClose={unlinkFacebook}>
          <Icon icon="facebook" /> Connected
        </Tag>
      )}

      <div className="mt-2">

      {!isConnected["google.com"] && (
       <Button block color="green" onClick={linkGoogle}>
       <Icon icon="google" /> Link to Google
     </Button>
      )}
      {!isConnected["facebook.com"] && (
         <Button block color="blue" onClick={linkFacebook}>
         <Icon icon="facebook" /> Link to facebook
       </Button>
      )}
        
       
      </div>
    </div>
  );
}
