import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Navbar from './navbar/';
import { routes } from './routes';

const UnAuth: React.FC = () => {
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
                            <route.component title={route.name} {...props} />
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
export default UnAuth;