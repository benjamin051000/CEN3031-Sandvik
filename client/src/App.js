import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Dashboard from "./views/Dashboard/Dashboard"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import Calculator from "./views/Calculator/Calculator"
import CalculatorOutput from './views/Calculator/CalculatorOutput';
import Settings from "./views/Settings/Settings"
import History from "./views/History/History"
import NewHeader from "./components/Header/NewHeader"
import Login from "./views/Login/Login"
import './App.css';

const App = () => {
  return (
    <div>
      
      <NewHeader/>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/calculator" component={Calculator} />
        <Route exact path="/history" component={History} />
        <Route exact path="/settings" component={Settings} />
        <Route path='/CalculatorOutput' component={CalculatorOutput} />
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
