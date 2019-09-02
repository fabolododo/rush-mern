import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";

import API from "../utils/API";
import Axios from "axios";


export class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: null
    }
  }

  componentDidMount() {
    Axios.get(`http://localhost:4242/users/listUser/`+ this.props.match.params.id)
        .then(response => {
          this.setState({users: response.data});
        })
        .catch(function (error) {
          console.log(error);
        })
  }

  disconnect = () => {
    API.logout();
    this.props.history.push('/');
  };


  UserDetails() {
      console.log(this.state.users);
    return (this.state.users ? 
      <Card.Body>
      <Card.Title>{ this.state.users.name }</Card.Title>
      <Card.Text>
        { this.state.users.email }
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body> : undefined);
    
  }

  render() {
    return (
      <div className="User Details">
        <h1>User Details</h1>
        <Card>
          <Card.Header as="h5">Featured</Card.Header>
          { this.UserDetails() }
        </Card>
        <Button onClick={this.disconnect} block bssize="large" type="submit">
          Se déconnecter
        </Button>
      </div>
    );
  }
}