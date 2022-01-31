import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../firebase";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>{
        //when working with realtime data we need to unsubscribe when we dont need it
        //subscribe to current user
        let userRef;

        const authUnsub = auth.onAuthStateChanged(authObj => {
            if (authObj) {
                //.on is a realtime listener, also need to unsub from database
                userRef = database.ref(`/profiles/${authObj.uid}`);
                userRef.on('value', (snapshot) =>{
                    const { name, createdAt } = snapshot.val();
                    const data = {
                        name,
                        createdAt,
                        uid: authObj.uid,
                        email: authObj.email,
    
                    }
                    setProfile(data);
                    setLoading(false);
                });
                
            } else {
                if(userRef) {
                    userRef.off();
                }

                setProfile(null);
                setLoading(false);
            }
        } );

        return () => {
            authUnsub();
            //always unsub from realtime checks so its not constantly running
            if(userRef) {
                userRef.off();
            }
        }
    }, [])

    return <ProfileContext.Provider value={{ isLoading, profile }}>
        {children}
    </ProfileContext.Provider>
};

export const useProfile = () => useContext(ProfileContext);