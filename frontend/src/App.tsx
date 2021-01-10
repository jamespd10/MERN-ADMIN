import React, { Suspense } from 'react';
import './App.css';
//import Routes from './routes/';
import 'line-awesome/dist/line-awesome/css/line-awesome.css';
const Routes = React.lazy(() => import('./routes'));

const loginUser = React.createContext(false);

function App() {
  return (
    <loginUser.Provider value={false}>
      {/*render ? <div className="loader-page"></div> : <Routes />*/}
      <Suspense fallback={<div className="loader"></div>}>
        <Routes />
      </Suspense>
    </loginUser.Provider>
  );
}

export default App;
