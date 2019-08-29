import React from "react";
import { Button, Card } from "react-bootstrap";

import API from "../utils/API";
import Axios from "axios";

const User= props => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.email}</td>
  </tr>
)

export class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    Axios.get(`http://localhost:4242/users/listUser/:id`)
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
    return this.state.users.map(function(currentUser){
      return <User user= { currentUser } />
    })
  }
  render() {
    return (
      <div className="User Details">
        <h1>User Details</h1>
        <Card>
          <Card.Header as="h5">Featured</Card.Header>
          <Card.Body>
            <Card.Title>{ this.props.user.name }</Card.Title>
            <Card.Text>
              { this.props.user.email }
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>

        <Button onClick={this.disconnect} block bssize="large" type="submit">
          Se déconnecter
        </Button>
      </div>
    );
  }
}