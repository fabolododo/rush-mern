import React, { Component } from "react";
import { Button, Card, Container, Modal, ButtonGroup, Image, Col, Row, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../utils/API";
import axios from "axios";
import avatar from "../avatar/avatarMan.png";
import logo from "../logo/logo.png";
import { Navbar, Nav } from "react-bootstrap";


export class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: null,
      name: "",
      email: "",
      password: "",
      id: "",
      post: "",
      userModal: false,
      displaySnackBar: false
    };
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  componentDidMount() {
    
    this.setState({ name: this.state.name });
    this.setState({ newName: this.state.name });
    this.setState({ email: this.state.email });
    this.setState({ newEmail: this.state.email });
    this.setState({ password: this.state.password });
    this.setState({ newPassword: this.state.password });

    axios.get(`http://localhost:4242/users/listUser/`+ this.props.match.params.id)
        .then(response => {
          // this.setState({users: response.data});
          this.setState({ name: response.data.name});
          this.setState({ email: response.data.email});
          this.setState({ password: response.data.password});
          this.setState({ id: response.data._id});
        })
        .catch(function (error) {
          console.log(error);
        })
  };

  send = async () => {
    const id = this.props.match.params.id;
    
    const { post } = this.state;
    if (!post || post.length === 0) {
      this.displayHandleSnackbar("");
      return;
    };

    var newPost = {
      id,
      post
    }

    console.log(newPost);

      axios
      .post(`http://localhost:4242/posts/addPost`, newPost)
      .then(response => {
        this.setState({ snackMessage: "Post Added Successfully!" });
        this.handleSnackbar()
    }) 
      .catch (error => {
      console.error(error);
      this.setState({ snackMessage: "Post failed to save!" });
      this.handleSnackbar();
    });
  };

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

  handlePost = e => {
    this.setState({ post: e.target.value });
  };

  displayHandleSnackbar = (message) => {
    console.error(message);
      this.setState({ snackMessage: message });
      this.handleSnackbar();
  };

handleSnackbar = () => {
    this.setState({ displaySnackBar: true });
    setTimeout(() => this.setState({ displaySnackBar: false }), 3000);
  };

  redirectListUser = () => {
    this.props.history.push('/listUser');
  }

  disconnect = () => {
    API.logout();
    this.props.history.push('/');
  };

  handleEditUser = e => {
    e.preventDefault();
    this.setState({ userModal: false });

    var editUser = {
      name: this.state.newName,
      email: this.state.newEmail,
      password: this.state.newPassword,
      cPassword: this.state.newCPassword,
    };
    // this.props.onEditUser(editUser);

    
    axios
    .put( `http://localhost:4242/users/listUser/` + this.state.id + `/update`, editUser)
    .then(response => {
      this.setState({ name: this.state.newName });
      this.setState({ email: this.state.newEmail });
      this.setState({ password: this.state.newPassword });
      this.setState({ snackMessage: "User Updated Successfully!" });
      this.handleSnackbar();
    })
    .catch(err => {
      console.log(err);
      this.setState({ snackMessage: err.response.data.text });
      this.handleSnackbar();
    });

  };


  render() {
        const {
      newName,
      newEmail,
      snackMessage
    } = this.state;
    return (
      <div className="User Details">
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
                <Nav.Link href="/">Followers</Nav.Link>
                <Nav.Link href="/">Post</Nav.Link>
            </Nav>
        </Navbar>
        <br/>
        <h1>User Details</h1>
        <Container>
          <Row>
            <Col md = {4}>
              <Card>
                <Card.Header as="h3">{ this.state.name }</Card.Header>
                <Card.Body>
                  <Card.Title>
                  <Image src={avatar}
                    width="100"
                    height="100"
                    roundedCircle />
                  </Card.Title>
                  <Card.Text>
                    { this.state.email }
                  </Card.Text>
                  <ButtonGroup className="mr-2" aria-label="First group">
                    <Button variant="dark" onClick={() => this.setState({ userModal: true })}>Edit User</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mr-2" aria-label="First group">
                    <Button variant="dark" onClick={this.redirectListUser}>List User</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                  <Button onClick={this.disconnect} variant="dark" block bssize="large" type="submit">
                Logout
              </Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={8}>
              <Card  style={{ width: '50' }}>
                <Card.Header as="h3">{ this.state.name }</Card.Header>
                <Card.Body>
                  <Card.Title>
                  <Image src={avatar}
                    width="100"
                    height="100"
                    roundedCircle />
                  </Card.Title>
                  <Card.Text>
                    { this.state.email }
                  </Card.Text>
                  <ButtonGroup className="mr-2" aria-label="First group">
                    <Button variant="dark" onClick={() => this.setState({ userModal: true })}>Edit User</Button>
                  </ButtonGroup>
                  <ButtonGroup className="mr-2" aria-label="First group">
                    <Button variant="dark" onClick={this.redirectListUser}>List User</Button>
                  </ButtonGroup>
                  <ButtonGroup>
                  <Button onClick={this.disconnect} variant="dark" block bssize="large" type="submit">
                Logout
              </Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br/>
          <Row>
            <Col md={{ div: 2, offset: 4 }}>
            <div className="PostForm">
            <FormGroup controlId="post">
              <FormLabel>Add Post</FormLabel>
              <FormControl
               as="textarea"
               rows="8"
               onChange={this.handlePost}
                />
            </FormGroup>
          <Button onClick={this.send} block bssize="large" variant="dark" type="submit">
            Add Post
          </Button>
        </div>
            </Col>
          </Row>
        </Container>
        

        <Modal show={this.state.userModal} style={{ opacity: 1 }}>
          <Modal.Header>
            <Modal.Title>Edit user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" name="editUserForm">
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

        {this.state.displaySnackBar ? (
            <div
                id="snackbar"
                style={{fontSize:"25px", color:"red", textAlign:"center"}}
            >
                {snackMessage}
            </div>
            ) : null
          }
      </div>
    );
  }
}