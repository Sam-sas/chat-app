import React from 'react';
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite';
import firebase from 'firebase/app';
import { auth, database } from '../firebase';
export default function SignIn() {
    const onGoogleSignIn = () => {
        signInWithProvider( new firebase.auth.GoogleAuthProvider());
    };
    const signInWithProvider = async (provider) =>{
        try {   
            //import provider from firebase library
            const {additionalUserInfo, user} = await auth.signInWithPopup(provider);
            //anything with db you need to use promises
            if(additionalUserInfo.isNewUser) {
                await database.ref(`/profiles/${user.uid}`).set({
                    name: user.displayName,
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                });
            }
            Alert.success('Signed in', 4000);
        } catch (err) {
            Alert.error(err.messsage, 4000);
        }
        
       
    };

  return (
      <Container>
          {/* //24 colum system instead of 12 like bootstrap */}
          <Grid className='mt-page'>
              <Row>
                <Col xs={24} md={12} mdOffset={6}>
                    <Panel>
                        <div className='text-center'>
                            <h2>Welcome to the chat</h2>
                            <p>Test chat platform</p>
                        </div>
                        <div className='mt-3'>
                            <Button block color="green" appearance='primary' onClick={onGoogleSignIn}>
                                <Icon icon="google"/> Continue with Google
                            </Button>
                        </div>
                    </Panel>
                </Col>
              </Row>
          </Grid>
      </Container>
  )
}
