import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      userModal: false
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

  handleEditUser = e => {
    e.preventDefault();
    this.setState({ userModal: false });
    var editUser = {
      name: this.state.newName,
      email: this.state.newEmail,
      password: this.state.newPassword,
      _id: this.props._id
    };

    this.props.onEditUser(editUser);
    this.setState({ name: this.state.newName });
    this.setState({ email: this.state.newEmail });
    this.setState({ password: this.state.newPassword });
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
      newPassword,
      name,
      email,
      password
    } = this.state;
    return (
      <tr>
        <td><Link to={`listUser/${this.props._id}`}>{name}</Link></td>
        <td>
          {email}
        </td>
        <td>
        {password}
        </td>
        <td>
          <Button
            className="btn btn-info"
            id={"edit" + name + email}
            onClick={() => this.setState({ userModal: true })}
          >
            Edit
          </Button>
        </td>
        <td>
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
                    onChange={this.password}
                    value={newPassword}
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
    );
  }
}

export default User;
