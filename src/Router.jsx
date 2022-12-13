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
        path="/:page"
        element={ <App /> }
      />
    </Routes>
  );
}

export default Router;
