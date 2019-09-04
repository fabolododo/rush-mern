import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../utils/API";
import logo from "../logo/logo.png";
import { Navbar, Nav } from "react-bootstrap";


export class Login extends React.Component {
  state = {
    name: "",
    password: "",
    displaySnackBar: false
  };
  send = async () => {
    const { name, password } = this.state;
    
    try {
      const { data } = await API.login(name, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      console.log(data);
      this.props.history.push(`listUser/${data.id}`);
    } catch (error) {
      console.error(error.response.data.text);
      this.setState({ snackMessage: error.response.data.text });
      this.handleSnackbar();
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  handleSnackbar = () => {
    this.setState({ displaySnackBar: true });
    setTimeout(() => this.setState({ displaySnackBar: false }), 3000);
  };
  render() {
    const { name, password, snackMessage } = this.state;
    return (
      <div className="Login">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          MicroBloggos
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar>
        <br/>
        <br/>
        <h1>Login</h1>
         {this.state.displaySnackBar ? (
          <div
            id="snackbar"
            style={{fontSize:"25px", color:"red", textAlign:"center"}}
          >
            {snackMessage}
          </div>
        ) : null}
        <div className="LoginForm">
          <FormGroup controlId="name" bssize="large">
            <FormLabel>name</FormLabel>
            <FormControl
              autoFocus
              type="text"
              value={name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bssize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button onClick={this.send} block bssize="large" variant="dark" type="submit">
            Connexion
          </Button>
        </div>
      </div>
    );
  }
}

