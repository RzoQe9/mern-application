import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const User = props => (
    <tr className="singleUser">
        <th scope="row"></th>
        <td className='desc-col'>{props.username}</td>
        <td className='button-col'>{props.name}</td>
        <td className='button-col'>{props.email}</td>
        <td className='button-col'>{props.age}</td>
        <td><a onClick={() => { props.handleUpdateUser(props.id); }}>update</a></td>
        <td><a onClick={() => { props.handleDeleteUser(props.id); }}>delete</a></td>
    </tr>
);

User.propTypes = {
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    bio: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    handleUpdateUser: PropTypes.func.isRequired,
    handleDeleteUser: PropTypes.func.isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
};

const x = '<span className="time">{moment(props.timestamp).fromNow()}</span>'
export default User;