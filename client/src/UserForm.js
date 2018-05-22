import React from 'react';
import PropTypes from 'prop-types';

const UserForm = props => (
    <form onSubmit={props.submitUser}>
        <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input className="form-control"
                   type="text"
                   id="name"
                   name="name"
                   value={props.name}
                   onChange={props.handleChangeText}
            />
        </div>

        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input className="form-control"
                   type="email"
                   id="email"
                   name="email"
                   value={props.email}
                   onChange={props.handleChangeText}
            />
        </div>

        <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input className="form-control"
                   type="text"
                   id="username"
                   name="username"
                   value={props.username}
                   onChange={props.handleChangeText}
            />
        </div>

        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input className="form-control"
                   type="password"
                   id="password"
                   name="password"
                   value={props.password}
                   onChange={props.handleChangeText}
            />
        </div>

        <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input className="form-control"
                   type="number"
                   id="age"
                   name="age"
                   value={props.age}
                   onChange={props.handleChangeNumber}
            />
        </div>

        <div className="form-group">
            <label htmlFor="bio">Bio:</label>
            <textarea  className="form-control"
                       id="bio"
                       name="bio"
                       value={props.bio}
                       onChange={props.handleChangeText}
            />
        </div>
        <button type="submit">Submit</button>
    </form>
);



UserForm.propTypes = {
    submitUser: PropTypes.func.isRequired,
    handleChangeText: PropTypes.func.isRequired,
    handleChangeNumber: PropTypes.func.isRequired,
    username: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    password: PropTypes.string,
    age: PropTypes.number,
    bio: PropTypes.string,
};

UserForm.defaultProps = {
    username: '',
    email: '',
    name: '',
    password: '',
    age: 0,
    bio: '',
};

export default UserForm;
