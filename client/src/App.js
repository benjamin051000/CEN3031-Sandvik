import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from "./views/Dashboard/Dashboard"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import Calculator from "./views/Calculator/Calculator"
import CalculatorOutput from './views/Calculator/CalculatorOutput';
import Settings from "./views/Settings/Settings"
import History from "./views/History/History"
import Login from "./views/Login/Login"
import './App.css';

const App = () => {
  //Global States
  const [comingFromHistory, setComingFromHistory] = useState([]);
  const [isAdmin, setIsAdmin] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState({
    name: null
  });



  return (
    <div>

      <Header />
      <Switch>
        <Route exact path="/login" component={Login}
          setIsAdmin={setIsAdmin}
          setIsSignedIn={setIsSignedIn}
        />
        <Route exact path="/dashboard" component={Dashboard} 
          isSignedIn = {isSignedIn}
        />
        <Route exact path="/calculator" component={Calculator} />
        <Route exact path="/history" component={History}
          setComingFromHistory={setComingFromHistory}
        />
        <Route exact path="/settings" component={Settings}
          isAdmin={isAdmin}
        />
        <Route path='/CalculatorOutput' component={CalculatorOutput}
          comingFromHistory={comingFromHistory}
        />
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
