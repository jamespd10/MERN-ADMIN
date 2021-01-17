import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import { UserContext } from './constants';
import api from './api';
import CssBaseline from '@material-ui/core/CssBaseline';
const Routes = React.lazy(() => import('./routes'));

function App() {

  useEffect(() => {
    fetchUser();
  });

  const [userData, setUserData] = useState({});
  const value = { userData, setUserData };

  const fetchUser = async () => {
    await api.get('/usuarios/validate-session')
      .then(function (response) {
        setUserData(response.data);
      })
      .catch(function (error) {
        return null;
      });
  }
  return (

    <UserContext.Provider value={value}>
      <CssBaseline />
      <Suspense fallback={<div className="loader-page"></div>}>
        <Routes />
      </Suspense>
    </UserContext.Provider>
  );
}

export default App;
