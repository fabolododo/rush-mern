import React from "react";
import User from "./User";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../logo/logo.png";
import { Navbar, Nav } from "react-bootstrap";




export class ListUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Posts: [],
            name: "",
            text: "",
            id:"",
            userFormModal: false,
            displaySnackBar: false
        };

        this.handleName = this.handleName.bind(this);
        this.handleText = this.handleText.bind(this);
    }


    // API Request by Axios 
    componentDidMount() {
        axios.get(`http://localhost:4242/posts/listPosts`)
            .then(response => {
                this.setState({posts: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
        
        this.setState({ name: this.props.name });
        this.setState({ newName: this.props.name });
        this.setState({ text: this.props.text });
        this.setState({ newText: this.props.ext });
        
    }

    handleEditPost = editPost => {
        if (!this.props.name || this.props.name === 0){
            console.log(this.props.name);
            
            this.displayHandleSnackbar("Name Is Required");
            return;
        }
        if (!this.props.text || this.props.text === 0){
            console.log(this.props.text);
            
            this.displayHandleSnackbar("text Is Required");
            return;
        }
        axios
          .put( `http://localhost:4242/posts/listPost/` + editPost._id + `/update`, editPost)
          .then(response => {
              
            this.setState({ snackMessage: "Post Updated Successfully!" });
            this.handleSnackbar();
          })
          .catch(err => {
            console.log(err);
            this.setState({ snackMessage: err.response.data.text });
            this.handleSnackbar();
        });
      };

    handleName = e => {
        this.setState({ newName: e.target.value });
    };

    handleText = e => {
        this.setState({ newText: e.target.value });
    };


    displayHandleSnackbar = (message) => {
        console.error(message);
          this.setState({ snackMessage: message });
          this.handleSnackbar();
      }

    handleSnackbar = () => {
        this.setState({ displaySnackBar: true });
        setTimeout(() => this.setState({ displaySnackBar: false }), 3000);
    };

    render() {
        var { 
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
                    />
                ));
            }
        };

        return (
            <div className="ListUser">
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
                <h1> Users List</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">email</th>
                    </tr>
                    </thead>
                    {renderUsers()}
                </table>
                <div>
                    <Link to={`/ListUser/`+localStorage.getItem("id")}>Back to Profile</Link>
                </div>
                {this.state.displaySnackBar ? (
            <div
                id="snackbar"
                style={{fontSize:"25px", color:"red", textAlign:"center"}}
            >
                {snackMessage}
            </div>
            ) : null}
            </div>
        );
    }

}
