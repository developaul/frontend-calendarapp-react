import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import PublicRoute from './PublicRoute';
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    if (checking) return <h5>Espere...</h5>

    return (
        <Router>
            <>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/"
                        isAuthenticated={!!uid}
                        component={CalendarScreen}
                    />

                    <PublicRoute
                        exact
                        path="/login"
                        isAuthenticated={!!uid}
                        component={LoginScreen}
                    />

                    <Redirect to="/" />
                </Switch>
            </>
        </Router>
    )
}

export default AppRouter;