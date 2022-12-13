// import './App.css';
import React from 'react';
import { Route, Switch, useParams, BrowserRouter as Router} from 'react-router-dom';
import App from './App';

function RoutesTest() {
  return (
    <Router>
      <Route
        path="/"
        element={ <App /> }
      />
      <Route
        path="/:page"
        element={ <App /> }
      />
      <Switch>
          <Route path="/:id" children={<App />} />
        </Switch>
    </Router>
  );
}
      

export default RoutesTest;

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <div>
      <h3>ID: {id}</h3>
    </div>
  );
}