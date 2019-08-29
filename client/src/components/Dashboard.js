import React from "react";
import { Button } from "react-bootstrap";

import API from "../utils/API";

export class Dashboard extends React.Component {
  disconnect = () => {
    API.logout();
    this.props.history.push('/');
  };
  render() {
    console.log(window.location);
    
    return (
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <Button onClick={this.disconnect} block bssize="large" type="submit">
          Se déconnecter
        </Button>
      </div>
    );
  }
}