import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Navbar from './navbar';
import { routes } from '../auth/routes';
import { UserContext } from '../../constants';

const Auth: React.FC = () => {
    const userData = useContext(UserContext);
    const signOut = () => {
        userData.setUserData({});
    }
    return (
        <Router>
            <Navbar />
            <Switch>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={(props: any) => (
                            Object.keys(userData.userData).length > 0 ?
                                <route.component title={route.name} {...props} /> :
                                <Redirect to='/' />
                        )}
                    />
                )
                )}
                <Route path="/signout" onClick={signOut}>
                    <Redirect to='/' />
                </Route>
                <Route path="*">
                    <Redirect to='/' />
                </Route>
            </Switch>
        </Router>
    );
}
export default Auth;