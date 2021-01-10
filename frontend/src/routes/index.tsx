import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Navbar from './components/navbar';
import { routes } from './routes';

const Routes: React.FC = () => {
    //let auth = useContext(authContext);
    return (
        <Router>
            <Navbar />
            <Switch>
                {routes.map((route, index) => (
                    route.private ?
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            render={(props: any) => (
                                <route.component title={route.name} {...props} />
                            )}
                        /> :
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            render={(props: any) => (
                                <route.component title={route.name} {...props} />
                            )}
                        />
                ))}
            </Switch>
        </Router>
    );
}
export default Routes;