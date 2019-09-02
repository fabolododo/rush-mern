import React from "react";
import User from "./User";
import axios from "axios";




export class ListUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            name: "",
            email: "",
            password: "",
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

    }

    handleEditUser = editUser => {
        
        axios
          .put( `http://localhost:4242/users/listUser/` + editUser._id + `/update`, editUser)
          .then(response => {
            this.setState({ snackMessage: "User Updated Successfully!" });
            this.handleSnackbar();
          })
          .catch(err => {
            console.log(err);
            this.setState({ snackMessage: "User Update Failed!" });
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
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">email</th>
                        <th scope="col">password</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        <th />
                    </tr>
                    </thead>
                    <tbody>{renderUsers()}</tbody>
                </table>
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
