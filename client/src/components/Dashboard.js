import React from "react";
// import { Button, Card } from "react-bootstrap";

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
      users: []
    }
  }

  componentDidMount() {
    Axios.get(`http://localhost:4242/users/listUser/`+ this.props.match.params.id)
        .then(response => {
          console.log(response);
          let result = this.state.users;
          result.push(response.data);
          this.setState({users: result});
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
    console.log(typeof this.state.users);
    console.log(this.state.users);
    return this.state.users.map((currentUser, i) => <User user= { currentUser } key={i} />
    )
  }
  // render() {
  //   return (
  //     <div className="User Details">
  //       <h1>User Details</h1>
  //       <Card>
  //         <Card.Header as="h5">Featured</Card.Header>
  //         <Card.Body>
  //           <Card.Title>{ this.props.user.name }</Card.Title>
  //           <Card.Text>
  //             { this.props.user.email }
  //           </Card.Text>
  //           <Button variant="primary">Go somewhere</Button>
  //         </Card.Body>
  //       </Card>

  //       <Button onClick={this.disconnect} block bssize="large" type="submit">
  //         Se déconnecter
  //       </Button>
  //     </div>
  //   );
  // }

  render() {
    const snackMessage = this.state;
    return (
        <div className="UserList">
            <h1> Users Details</h1>
     {this.state.displaySnackBar ? (
      <div
        id="snackbar"
        style={{fontSize:"25px", color:"red", textAlign:"center"}}
      >
        {snackMessage}
      </div>
    ) : null}
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    { this.UserDetails() }
                </tbody>
            </table>
            {/* <Button onClick={this.disconnect} block bssize="large" type="submit">
          Se déconnecter
        </Button> */}
        </div>
    )
  }
}