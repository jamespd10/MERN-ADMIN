import React, { Fragment } from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute: any = (props: any): React.ReactNode => {
    console.log(props.user);
    return (
        <Fragment>
            {
                <Route
                    path={props.path}
                    exact={props.exact}
                    render={() => props.user ?
                        <props.component title={props.name} /> :
                        <Redirect to='/' />
                    }
                />
            }
        </Fragment>
    );
}

export default PrivateRoute;