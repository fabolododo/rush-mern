import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      author: "",
      postModal: false,
      displaySnackBar: false
    };
  }

  componentDidMount() {
    this.setState({ text: this.props.text });
    this.setState({ newText: this.props.text });
    this.setState({ author: this.props.author });
    this.setState({ newAuthor: this.props.author });
  }

  handleText = e => {
    this.setState({ newText: e.target.value });
  };

  handleAuthor = e => {
    this.setState({ newAuthor: e.target.value });
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

  handleEditPost = e => {
    e.preventDefault();
    this.setState({ userModal: false });

    var editPost = {
      text: this.state.newText,
      author: this.state.newAuthor,
      _id: this.props._id
    };
    console.log(editPost);
    this.props.onEditPost(editPost);

    axios
    .put( `http://localhost:4242/posts/listPost/` + editPost._id + `/update`, editPost)
    .then(response => {
      this.setState({ postModal: false });
      this.setState({ text: this.state.newText });
      this.setState({ author: this.state.newAuthor });
    })
    .catch(err => {
      console.log(err);
    });

  };

  handleDeletePost = e => {
    e.preventDefault();

    var deletePost = {
      _id: this.props._id
    };

    const result = window.confirm("Do you really want to delete this item ?");
    if (result === true) {
      this.props.onDeletePost(deletePost);
    }
  };



  render() {
    const {
      newText,
      newAuthor,
      text,
      author,
      snackMessage
    } = this.state;
    return (
    <tbody>
      <tr>
        <td scope="col">
          {text}
        </td>
        <td scope="col">
          {author}
        </td>
        <td scope="col">
          <Button
            className="btn btn-info"
            id={"edit" + text + author}
            onClick={() => this.setState({ postModal: true })}
          >
            Edit
          </Button>
        </td>
        <td scope="col">
          <Button
            id={"delete" + text + author}
            className="btn btn-danger"
            onClick={this.handleDeletePost}
          >
            Delete
          </Button>
        </td>

        <Modal show={this.state.postModal} style={{ opacity: 1 }}>
          <Modal.Header>
            <Modal.Title>Edit user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" name="newPostForm">
              <div className="form-group">
                <label className="col-md-4 control-label">Post</label>
                <div className="col-md-4">
                  <input
                    id="text"
                    name="text"
                    placeholder="Text"
                    onChange={this.handleText}
                    className="form-control"
                    value={newText}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label">Author</label>
                <div className="col-md-4">
                  <input
                    id="author"
                    name="author"
                    placeholder="author"
                    onChange={this.handleAuthor}
                    value={newAuthor}
                    className="form-control"
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ postModal: false })}>
              Close
            </Button>
            <Button id="submitform" onClick={this.handleEditPost}>
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

export default Post;