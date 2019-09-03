import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      userModal: false,
      displaySnackBar: false
    };
  }

  componentDidMount() {
    this.setState({ name: this.props.name });
    this.setState({ newName: this.props.name });
    this.setState({ email: this.props.email });
    this.setState({ newEmail: this.props.email });
    this.setState({ password: this.props.password });
    this.setState({ newPassword: this.props.password });
  }

  handleName = e => {
    this.setState({ newName: e.target.value });
  };

  handleEmail = e => {
    this.setState({ newEmail: e.target.value });
  };

  handlePassword = e => {
    this.setState({ newPassword: e.target.value });
  };

  handleCPassword = e => {
    this.setState({ newCPassword: e.target.value });
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

  handleEditUser = e => {
    e.preventDefault();
    this.setState({ userModal: false });

    var editUser = {
      name: this.state.newName,
      email: this.state.newEmail,
      password: this.state.newPassword,
      cPassword: this.state.newCPassword,
      _id: this.props._id
    };
    this.props.onEditUser(editUser);

    axios
    .put( `http://localhost:4242/users/listUser/` + editUser._id + `/update`, editUser)
    .then(response => {
      this.setState({ name: this.state.newName });
      this.setState({ email: this.state.newEmail });
      this.setState({ password: this.state.newPassword });
    })
    .catch(err => {
      console.log(err);
  });

  };

  handleDeleteUser = e => {
    e.preventDefault();

    var deleteUser = {
      _id: this.props._id
    };

    const result = window.confirm("Do you really want to delete this item ?");
    if (result === true) {
      this.props.onDeleteUser(deleteUser);
    }
  };



  render() {
    const {
      newName,
      newEmail,
      name,
      email,
      password,
      snackMessage
    } = this.state;
    return (
    <tbody>
      <tr>
        <td scope="col"><Link to={`listUser/${this.props._id}`}>{name}</Link></td>
        <td scope="col">
          {email}
        </td>
        <td scope="col">
          <Button
            className="btn btn-info"
            id={"edit" + name + email + password}
            onClick={() => this.setState({ userModal: true })}
          >
            Edit
          </Button>
        </td>
        <td scope="col">
          <Button
            id={"delete" + name + email}
            className="btn btn-danger"
            onClick={this.handleDeleteUser}
          >
            Delete
          </Button>
        </td>

        <Modal show={this.state.userModal} style={{ opacity: 1 }}>
          <Modal.Header>
            <Modal.Title>Edit user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" name="newUserForm">
              <div className="form-group">
                <label className="col-md-4 control-label">Name</label>
                <div className="col-md-4">
                  <input
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={this.handleName}
                    className="form-control"
                    value={newName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label">Email</label>
                <div className="col-md-4">
                  <input
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleEmail}
                    value={newEmail}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label">Password</label>
                <div className="col-md-4">
                  <input
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={this.handlePassword}
                    type="password"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label">Confirmation Password</label>
                <div className="col-md-4">
                  <input
                    id="cPassword"
                    name="cPassword"
                    placeholder=" Confirmation Password"
                    onChange={this.handleCPassword}
                    type="password"
                    className="form-control"
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ userModal: false })}>
              Close
            </Button>
            <Button id="submitform" onClick={this.handleEditUser}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </tr>
      <tr>
      {this.state.displaySnackBar ? (
            <div
                id="snackbar"
                style={{fontSize:"25px", color:"red", textAlign:"center"}}
            >
                {snackMessage}
            </div>
            ) : null}
      </tr>
    </tbody>
    );
  }
}

export default User;
