// import './App.css';
import React from 'react';
import { Routes, Route} from 'react-router-dom';
import App from './App';

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={ <App /> }
      />
      <Route
        path="cbmm"
        element={ <App /> }
      />
      <Route
        path="helbor"
        element={ <App /> }
      />
      <Route
        path="gpa"
        element={ <App /> }
      />
    </Routes>
  );
}

export default Router;
