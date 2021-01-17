import React, { Fragment } from 'react';
import { CACHE_KEYS } from '../constants';
import useSWR from 'swr';
import api from '../api';
import Auth from './auth';
import UnAuth from './unauth';

async function fetchUser() {
    try {
        const response = await api.get('/usuarios/yo');
        return response.data;
    } catch (error) {
        return null;
    }
}

const Routes: React.FC = () => {
    const { data: user } = useSWR(CACHE_KEYS.user, fetchUser);
    return (
        <Fragment>
            {
                user ? <Auth user={user} {...user} /> : <UnAuth />
            }
        </Fragment>
    );
}
export default Routes;