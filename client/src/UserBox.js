import React, { Component } from 'react';
import 'whatwg-fetch';
import UserList from './UserList';
import UserForm from './UserForm';

class UserBox extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            error: null,
            username: '',
            email: '',
            name: '',
            password: '',
            age: 0,
            bio: '',
        };
        this.pollInterval = null;
    }

    componentDidMount() {
        this.loadUsersFromServer();
        if (!this.pollInterval) {
            this.pollInterval = setInterval(this.loadUsersFromServer, 2000);
        }
    }

    componentWillUnmount() {
        if (this.pollInterval) clearInterval(this.pollInterval);
        this.pollInterval = null;
    }

    onChangeText = (e) => {
        const newState = { ...this.state };
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    onChangeNumber = (e) => {
        console.log(e.target)

        const newState = { ...this.state };
        newState[e.target.name] = parseInt(e.target.value, 10);
        this.setState(newState);
    }

    onUpdateUser = (id) => {
        const oldUser = this.state.data.find(c => c._id === id);
        if (!oldUser) return;
        this.setState({
            username: oldUser.username,
            email: oldUser.email,
            name: oldUser.name,
            password: oldUser.password,
            age: oldUser.age,
            bio: oldUser.bio,
            updateId: id
        });
    }

    onDeleteUser = (id) => {
        const i = this.state.data.findIndex(c => c._id === id);
        const data = [
            ...this.state.data.slice(0, i),
            ...this.state.data.slice(i + 1),
        ];
        this.setState({ data });
        fetch(`api/users/${id}`, { method: 'DELETE' })
            .then(res => res.json()).then((res) => {
            if (!res.success) this.setState({ error: res.error });
        });
    }

    submitUser = (e) => {
        e.preventDefault();
        // Todo: do form validation
        const {updateId } = this.state;
        console.log(updateId)
        if (updateId) {
            this.submitUpdatedUser();
        } else {
            this.submitNewUser();
        }
    }

    submitNewUser = () => {
        console.log('h')
        const { username, name, email, password, age, bio } = this.state;
        const data = [
            ...this.state.data,
            {
                username,
                email,
                name,
                password,
                age,
                bio,
                _id: Date.now().toString(),
                updatedAt: new Date(),
                createdAt: new Date()
            },
        ];
        this.setState({ data });
        fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, name, email, password, age, bio }),
        }).then(res => res.json()).then((res) => {
            if (!res.success) this.setState({ error: res.error.message || res.error });
            else this.setEmptyFields();
        });
    }

    submitUpdatedUser = () => {
        const { username, name, email, password, age, bio, updateId } = this.state;
        fetch(`/api/users/${updateId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, name, email, password, age, bio  }),
        }).then(res => res.json()).then((res) => {
            if (!res.success) this.setState({ error: res.error.message || res.error });
            else this.setEmptyFields();
        });
    }

    setEmptyFields = () => {
        this.setState({ username: '', email: '', name: '', password: '', age: 0, bio: '', error: null });
    }

    loadUsersFromServer = () => {
        fetch('/api/users')
            .then(data => data.json())
            .then((res) => {
                console.log(res)
                if (!res.success) this.setState({ error: res.error });
                else this.setState({ data: res.data });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="form col-md-6 offset-md-2">
                        <h2>Form:</h2>
                        <UserForm
                            username= {this.state.username}
                            email= {this.state.email}
                            name= {this.state.name}
                            password= {this.state.password}
                            age= {this.state.age}
                            bio= {this.state.bio}
                            handleChangeText={this.onChangeText}
                            handleChangeNumber={this.onChangeNumber}
                            submitUser={this.submitUser}
                        />
                    </div>
                </div>
                {this.state.error && <p>{this.state.error}</p>}
                <hr style={{'border-color': 'black'}}/>
                <div className="row">
                    <div className="users col-md-6 offset-md-2">
                        <h2>Users:</h2>
                        <UserList
                            data={this.state.data}
                            handleUpdateUser={this.onUpdateUser}
                            handleDeleteUser={this.onDeleteUser}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserBox;
