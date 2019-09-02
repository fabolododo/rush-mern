import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";

import API from "../utils/API";
import Axios from "axios";

// const User= props => (
//   <tr>
//     <td>{props.userProps.name}</td>
//     <td>{props.userProps.email}</td>
//   </tr>
// )

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

  // UserDetails() {
  //   console.log(typeof this.state.users);
  //   console.log(this.state.users);
  //   return this.state.users.map((currentUser, i) => <User user={ currentUser } key={i} />
    // )
  // }

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
    
    // <tr>
    //   <td>{ this.state.users.name }</td>
    //   <td>{ this.state.users.email }</td>
    // </tr> 
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

  // render() {
  //   const snackMessage = this.state;
  //   return (
  //       <div className="UserList">
  //           <h1> Users Details</h1>
  //    {this.state.displaySnackBar ? (
  //     <div
  //       id="snackbar"
  //       style={{fontSize:"25px", color:"red", textAlign:"center"}}
  //     >
  //       {snackMessage}
  //     </div>
  //   ) : null}
  //           <table className="table table-striped" style={{ marginTop: 20 }} >
  //               <thead>
  //                   <tr>
  //                       <th>Name</th>
  //                       <th>Email</th>
  //                   </tr>
  //               </thead>
  //               <tbody>
                    // { this.UserDetails() }
  //               </tbody>
  //           </table>
  //           {/* <Button onClick={this.disconnect} block bssize="large" type="submit">
  //         Se déconnecter
  //       </Button> */}
  //       </div>
  //   )
  // }
}