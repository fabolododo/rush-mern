import React, {Component} from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../utils/API";

export class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      cpassword: "",
      displaySnackBar: false
    };
  }

  send = async () => {
    const { name, email, password, cpassword } = this.state;
    if (!name || name.length === 0) {
      this.displayHandleSnackbar("Name must be required");
      return;
    };
    if (!email || email.length === 0) {
      this.displayHandleSnackbar("Email must be required");
      return;
    }
    if( /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(email) === false){
      this.displayHandleSnackbar("Email must be valid");
       return;
    }
    if (!password || password.length === 0){
      this.displayHandleSnackbar("Password must be required");
       return;
    }
    if (!cpassword || cpassword.length === 0){
      this.displayHandleSnackbar("Confirmation Password must be required");
      return;
   }
    if (password !== cpassword){
      this.displayHandleSnackbar("Password and Confirmation Password are not the same");
      return;
    }
    try {
      const { data } = await API.signup({ name, email, password });
      console.log(data);
      localStorage.setItem("token", data.token);
      this.props.history.push('/');
    } catch (error) {
      console.error(error.response.data.text);
      this.setState({ snackMessage: error.response.data.text });
      this.handleSnackbar();
    }
  };

  handleSnackbar = () => {
    this.setState({ displaySnackBar: true });
    setTimeout(() => this.setState({ displaySnackBar: false }), 3000);
  };

  displayHandleSnackbar = (message) => {
    console.error(message);
      this.setState({ snackMessage: message });
      this.handleSnackbar();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const {name, email, password, cpassword, snackMessage } = this.state;
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
        <FormGroup controlId="email" bssize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            value={email}
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
        <FormGroup controlId="cpassword" bssize="large">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            value={cpassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button onClick={this.send} block bssize="large" type="submit">
          Inscription
        </Button>
        <Link to='/'>
          Login
        </Link>
      </div>
    );
  }
}