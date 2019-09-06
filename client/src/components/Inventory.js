import React, { Component } from "react";
import { Button, Card, Container, Modal, ButtonGroup, Image, Col, Row, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../utils/API";
import axios from "axios";
import avatar from "../avatar/avatarMan.png";
import logo from "../logo/logo.png";
import { Navbar, Nav } from "react-bootstrap";
import Post from "./Post";

const HOST = "http://localhost:4242";

export class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      posts: [],
      postFormModal: false,
      name: "",
      email: "",
      password: "",
      id: "",
      text:"",
      author: "",
      postId: "",
      snackMessage: "",
      postModal: false,
      displaySnackBar: false
    };

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleAuthor = this.handleAuthor.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);
  }

  componentDidMount() {
    this.setState({ name: this.state.name });
    this.setState({ newName: this.state.name });
    this.setState({ email: this.state.email });
    this.setState({ newEmail: this.state.email });
    this.setState({ password: this.state.password });
    this.setState({ newPassword: this.state.password });

    this.setState({ text: this.state.text });
    this.setState({ newText: this.state.text });
    this.setState({ newAuthor: this.state.author });
    this.setState({ author: this.state.author });

    //List of all Users
    axios.get(`http://localhost:4242/users/listUser`)
            .then(response => {
                this.setState({users: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })

      // List of all Posts
    var urlListPost = HOST + `/posts/listPost/`;
    axios.get(urlListPost)
        .then(response => {
      this.setState({ posts: response.data });
        })
        .catch(function (error){
            console.log(error);
        })

    // API request User
    var urlUserDetails = HOST + `/users/listUser/`;
    axios.get(urlUserDetails + this.props.match.params.id)
    .then(response => {
      this.setState({ name: response.data.name});
      this.setState({ email: response.data.email});
      this.setState({ password: response.data.password});
      this.setState({ id: response.data._id});
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleNewPost = e => {
    const id = this.props.match.params.id;
    const { text } = this.state;

    if (!text || text.length === 0) {
        this.displayHandleSnackbar("Message required");
        return;
    }

    var newPost = {
        id,
        text
    };

    var urlAddPost = HOST + `/posts/addPost/`;
    axios
      .post(urlAddPost, newPost)
      .then(response => {
        this.setState({ snackMessage: "Post Added Successfully!" });
        this.handleSnackbar();
        let posts = this.state.posts;
        console.log(response.data.newPost);
        posts.push(response.data.newPost);
        this.setState({posts});

      })
      .catch(err => {
        console.log(err);
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

    handleText = e => {
    this.setState({ text: e.target.value });
    };

    handleAuthor = e => {
    this.setState({ author: e.target.value });
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

  // Update User

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

  //Update Post
  handleEditPost = editPost => {

    axios
    .put( `http://localhost:4242/posts/listPost/` + this.state.id + `/update`, editPost)
    .then(response => {
        console.log(response.data.text);
      this.setState({post: response.data});
        this.displayHandleSnackbar("Post Updated Successfully!");
    })
    .catch(err => {
      console.log(err);
      this.setState({ snackMessage: err.response });
      this.handleSnackbar();
    });

  };

  handleDeletePost = deletePost => {
      console.log(deletePost);
    axios
      .delete(HOST + `/posts/listPost/` + deletePost._id + `/delete`)
      .then(response => {
        this.setState({ snackMessage: "Post Deleted Successfully!" });
        this.handleSnackbar();
        let posts = this.state.posts;
        console.log(response.data.post._id);
        posts = posts.filter(post => post._id !== response.data.post._id);
        this.setState({posts});
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackMessage: "Post Delete Failed!" });
        this.handleSnackbar();
      });
  };

    render() {
        var {
        newName,
        newEmail,
        posts,
        snackMessage
        } = this.state;

        var renderPosts = () => {
            if (posts.length === 0){
                return <tr>{posts}</tr>;
            } else {
                return posts.map((post,index) => (
                    <Post
                    {...post}
                    key={index}
                    onEditPost={this.handleEditPost}
                    onDeletePost={this.handleDeletePost}
                    />
                ));
            }
        };
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
                {this.state.displaySnackBar ? (
            <div
                id="snackbar"
                style={{fontSize:"25px", color:"red", textAlign:"center"}}
            >
                {snackMessage}
            </div>
            ) : null}
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Text</th>
                        <th scope="col">Author</th>
                    </tr>
                    </thead>
                    {renderPosts()}
                </table>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col md={{ div: 2, offset: 4 }}>
                <div className="PostForm">
                <FormGroup controlId="text">
                <FormLabel>Add Post</FormLabel>
                <FormControl
                as="textarea"
                rows="8"
                onChange={this.handleText}
                    />
                </FormGroup>
            <Button onClick={this.handleNewPost} block bssize="large" variant="dark" type="submit">
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
                        id="text"
                        name="text"
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

           
        </div>
        );
    }



//   render() {
//     var { products, snackMessage } = this.state;

//     var renderProducts = () => {
//       if (products.length === 0) {
//         return <tr>{products}</tr>;
//       } else {
//         return products.map((product, index) => (
//           <Product
//             {...product}
//             key={index}
//             onEditProduct={this.handleEditProduct}
//             onDeleteProduct={this.handleDeleteProduct}
//           />
//         ));
//       }
//     };

//     return (
//       <div>
//         <div className="container">
//           <Button
//             className="btn btn-success pull-right"
//             id="addnewitem"
//             onClick={() => this.setState({ productFormModal: true })}
//           >
//             Add New Item
//           </Button>
//           <br />
//           <br />

//           <table className="table">
//             <thead>
//               <tr>
//                 <th scope="col">Name</th>
//                 <th scope="col">Quantity</th>
//                 <th scope="col">Edit</th>
//                 <th scope="col">Delete</th>
//                 <th />
//               </tr>
//             </thead>
//             <tbody>{renderProducts()}</tbody>
//           </table>
//         </div>

//         <Modal show={this.state.productFormModal}>
//           <Modal.Header>
//             <Modal.Title>Add Product</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <form className="form-horizontal" name="newProductForm">
//               <div className="form-group">
//                 <label className="col-md-4 control-label" htmlFor="name">
//                   Name
//                 </label>
//                 <div className="col-md-4">
//                   <input
//                     id="name"
//                     name="name"
//                     placeholder="Name"
//                     className="form-control"
//                     onChange={this.handleName}
//                   />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label className="col-md-4 control-label" htmlFor="quantity">
//                   Quantity
//                 </label>
//                 <div className="col-md-4">
//                   <input
//                     id="quantity"
//                     name="quantity"
//                     placeholder="Quantity"
//                     onChange={this.handleQuantity}
//                     className="form-control"
//                   />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label className="col-md-4 control-label" htmlFor="unittype">
//                   Unit Type
//                 </label>
//                 <div className="col-md-4">
//                   <input
//                     id="unittype"
//                     name="unittype"
//                     placeholder="Unit type"
//                     onChange={this.handleUnitType}
//                     className="form-control"
//                   />
//                 </div>
//               </div>
//             </form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button
//               id="closeform"
//               onClick={() => this.setState({ productFormModal: false })}
//             >
//               Close
//             </Button>
//             <Button id="submitform" onClick={this.handleNewProduct}>
//               Submit
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         {this.state.displaySnackBar ? (
//           <div
//             id="snackbar"
//             style={{fontSize:"25px", color:"red", textAlign:"center"}}
//           >
//             {snackMessage}
//           </div>
//         ) : null}
//       </div>
//     );
//   }
}

