import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainScreen from './screens/MainScreen'; 

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainScreen} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
}

export default Routes;
