import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const UserList = (props) => {
    const userNodes = props.data.map(user => (
        <User
            username= {user.username}
            email= {user.email}
            name= {user.name}
            password= {user.password}
            age= {user.age}
            bio= {user.bio}
            key={user._id}
            id={user._id}
            timestamp={user.updatedAt}
            handleUpdateUser={props.handleUpdateUser}
            handleDeleteUser={props.handleDeleteUser}
        >
        </User>
    ));
    return (
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th scope="col" >Username</th>
                    <th scope="col" >Name</th>
                    <th scope="col" >Email</th>
                    <th scope="col" >Age</th>
                </tr>
            </thead>
            <tbody>
                { userNodes }
            </tbody>
        </table>
    );
};

UserList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        name: PropTypes.string,
        password: PropTypes.string,
        age: PropTypes.number,
        bio: PropTypes.string,
        id: PropTypes.string,
        updatedAt: PropTypes.instanceOf(Date),
    })),
    handleDeleteUser: PropTypes.func.isRequired,
    handleUpdateUser: PropTypes.func.isRequired,
};

UserList.defaultProps = {
    data: [],
};

export default UserList;