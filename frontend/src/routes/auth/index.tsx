import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Navbar from './navbar';
import { routes } from '../auth/routes';

const Auth: React.FC = (user: any) => {
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
                            user ?
                                <route.component title={route.name} {...props} /> :
                                <Redirect to='/' />
                        )}
                    />
                )
                )}
                <Route path="*">
                    <Redirect to='/' />
                </Route>
            </Switch>
        </Router>
    );
}
export default Auth;