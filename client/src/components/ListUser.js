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
            users: [],
            name: "",
            email: "",
            password: "",
            id:"",
            userFormModal: false,
            displaySnackBar: false
        };

        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }



    // API Request by Axios 
    componentDidMount() {
        axios.get(`http://localhost:4242/users/listUser`)
            .then(response => {
                this.setState({users: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
        
        this.setState({ name: this.props.name });
        this.setState({ newName: this.props.name });
        this.setState({ email: this.props.email });
        this.setState({ newEmail: this.props.email });
        this.setState({ password: this.props.password });
        this.setState({ newPassword: this.props.password });
        this.setState({ newCPassword: this.props.password });
        
    }

    handleEditUser = editUser => {
        if (this.props.newPassword !== this.props.newCPassword){
            console.log(this.props.newCPassword);
            
            this.displayHandleSnackbar(" New Password & New Confirmation Password should have the same");
            return;
        }
        axios
          .put( `http://localhost:4242/users/listUser/` + editUser._id + `/update`, editUser)
          .then(response => {
              
            this.setState({ snackMessage: "User Updated Successfully!" });
            this.handleSnackbar();
          })
          .catch(err => {
            console.log(err);
            this.setState({ snackMessage: err.response.data.text });
            this.handleSnackbar();
            // window.location.reload();
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
            users,
            snackMessage
        } = this.state;

        var renderUsers = () => {
            if (users.length === 0){
                return <tr>{users}</tr>;
            } else {
                return users.map((user,index) => (
                    <User 
                    {...user}
                    key={index}
                    onEditUser={this.handleEditUser}
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
