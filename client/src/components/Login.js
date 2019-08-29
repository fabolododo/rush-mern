import React from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../utils/API";

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
      console.log(data);
      this.props.history.push('/' + name);
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
         {this.state.displaySnackBar ? (
          <div
            id="snackbar"
            style={{fontSize:"25px", color:"red", textAlign:"center"}}
          >
            {snackMessage}
          </div>
        ) : null}
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
        <Button onClick={this.send} block bssize="large" type="submit">
          Connexion
        </Button>
          <Link to="/signup">Register</Link>
      </div>
    );
  }
}

