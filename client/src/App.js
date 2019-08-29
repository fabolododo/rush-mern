import React, { Component } from "react";
import {  Route, Switch } from "react-router-dom";
import { Dashboard } from "./components/Dashboard.js";
import { Login } from "./components/Login.js";
import { Signup } from "./components/Signup.js";
import { ListUser } from "./components/ListUser.js";
import { PrivateRoute } from "./components/PrivateRoute.js";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="App">
          <div className="App-content">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute path="/listUser/:name" component={Dashboard} />
              <PrivateRoute path="/listUser" component={ListUser} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
