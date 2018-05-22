import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UserBox from './UserBox';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<UserBox />, document.getElementById('root'));

registerServiceWorker();