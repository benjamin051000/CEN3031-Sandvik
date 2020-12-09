import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Dashboard from "./views/Dashboard/Dashboard";
import NotFound from "./views/NotFound";
import Header from "./components/Header/Header";
import Calculator from "./views/Calculator/Calculator";
import Output from './views/Output/Output.js';
import Settings from "./views/Settings/Settings";
import History from "./views/History/History";
import Login from "./views/Login/Login";
import './App.css';


const App = () => {
  //Global States
  const [isAdmin, setIsAdmin] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState({
    name: null
  });

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/login" 
          render={(props)=>(
            <Login {...props} setIsAdmin={setIsAdmin} setIsSignedIn={setIsSignedIn}/>
          )}
        />
        <Route exact path="/dashboard" 
          render={(props)=>(
            <Dashboard {...props} isSignedIn={isSignedIn}/>
          )}
        />
        <Route exact path="/calculator" component={Calculator} />
        <Route exact path="/history" 
           render={(props)=>(
            <History {...props}/>
          )}
        />
        <Route exact path="/settings" 
          render={(props)=>(
            <Settings {...props} isAdmin={isAdmin}/>
          )}
        />
        <Route path='/CalculatorOutput' 
          render={(props)=>(
            <CalculatorOutput {...props} />
          )}
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
