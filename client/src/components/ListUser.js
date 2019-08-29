import React from "react";
import axios from "axios";
// import API from "../utils/API";

export class ListUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
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

    componentDidMount() {
        axios.get(`http://localhost:4242/users/listUser`)
            .then(response => {
                this.setState({users: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    UserList() {
        return this.state.users.map(function(currentUser, i){
            return <User user={currentUSer} key={i} />
        })
    };

    handleSnackbar = () => {
        this.setState({ displaySnackBar: true });
        setTimeout(() => this.setState({ displaySnackBar: false }), 3000);
    };

    render() {
        return (
            <div>
                <h3> Users List</h3>
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

