import React from "react";
import axios from "axios";
// import API from "../utils/API";

const User= props => (
    <tr>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
    </tr>
  )


export class ListUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            displaySnackBar: false
        };
    }

    // send = async () => {
    //     try {
    //         const {data} ={name: ""}
            // const { data } = await API.ListUser();
    //         console.log(data);
    //     }catch (error) {
    //         console.error(error.response.data.text);
    //         StyleSheetList.setState({ snackMessage: error.response.data.text });
    //         this.handleSnackBar();
    //     }
    // };

    // API Request by Axios 
    componentDidMount() {
        axios.get(`http://localhost:4242/users/listUser`)
            .then(response => {
                this.setState({users: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    // Create a map of all the users
    UserList() {
        return this.state.users.map(function(currentUser, i){
            return <User user={ currentUser } key={i} />
        })
    };

    handleSnackbar = () => {
        this.setState({ displaySnackBar: true });
        setTimeout(() => this.setState({ displaySnackBar: false }), 3000);
    };

    render() {
        const snackMessage = this.state;
        return (
            <div className="UserList">
                <h1> Users List</h1>
         {this.state.displaySnackBar ? (
          <div
            id="snackbar"
            style={{fontSize:"25px", color:"red", textAlign:"center"}}
          >
            {snackMessage}
          </div>
        ) : null}
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.UserList() }
                    </tbody>
                </table>
            </div>
        )
    }

}

