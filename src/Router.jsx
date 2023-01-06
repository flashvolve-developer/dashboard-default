import './App.css';
import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import App from './App';

function Routes() {
  return (
    <Router>
      {/* <Route
        path="/"
        element={<App />}
      /> */}
      {/* <Route
        path="/:page"
        element={<App />}
      /> */}
      <Switch>
        <Route exact path="/" children={<App />} />
        <Route path="/:id" children={<App />} />
      </Switch>
    </Router>
  );
}

export default Routes;

// function Child() {
//   // We can use the `useParams` hook here to access
//     <div>
//       <h3>ID: {id}</h3>
//     </div>
// }

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams
// } from "react-router-dom";

// Params are placeholders in the URL that begin
// with a colon, like the `:id` param defined in
// the route in this example. A similar convention
// is used for matching dynamic segments in other
// popular web frameworks like Rails and Express.

// export default function ParamsExample() {
//   return (
//     <Router>
//       <div>
//         <h2>Accounts</h2>

//         <ul>
//           <li>
//             <Link to="/:id">Netflix</Link>
//           </li>
//           <li>
//             <Link to="/zillow-group">Zillow Group</Link>
//           </li>
//           <li>
//             <Link to="/yahoo">Yahoo</Link>
//           </li>
//           <li>
//             <Link to="/modus-create">Modus Create</Link>
//           </li>
//         </ul>

//         <Switch>
//           <Route path="/:id" children={<Child />} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// function Child() {
//   // We can use the `useParams` hook here to access
//   // the dynamic pieces of the URL.
//   let { id } = useParams();

//   return (
//     <div>
//       <h3>ID: {id}</h3>
//     </div>
//   );
// }
