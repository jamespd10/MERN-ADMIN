import React, { Fragment, useContext } from 'react';
import Auth from './auth';
import UnAuth from './unauth';
import { UserContext } from '../constants';

const Routes: React.FC = () => {
    const userData = useContext(UserContext);
    return (
        <Fragment>
            {
                Object.keys(userData.userData).length > 0 ? <Auth /> : <UnAuth />
            }
        </Fragment>
    );
}
export default Routes;