import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

//wrapper for current routes so there isn't a way to access the dashboard without logging in first
export default function PublicRoute({ children, ...routeProps}) {
    const { profile, isLoading } = useProfile();

    if(isLoading && !profile) {
        return <Container>
            <Loader center vertical size="md" content="Loading" speed='slow' />
        </Container>
    }

    if(profile && !isLoading) {
        return <Redirect to="/" />
    }

    return (
        <Route {...routeProps}>
            {children}
        </Route>
    )
}
