import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import User from './models/user';


// create our instances
const app = express();
const router = express.Router();

// set our port to 3001
const API_PORT = 3001;

// db config -- set our db url
mongoose.connect('mongodb://127.0.0.1:27017/mern-application-db1');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// TODO: check this line
// set the route path & initialize the API
router.get('/', (req, res) => {
    //res.json({ message: 'Hello, World!' });
    res.render('index')
});

router.get('/users', (req, res) => {
    User.find((err, users) => {
        if (err) return res.json({ success: false, error: err });
        if(users)
            return res.json({ success: true, data: users });
        else
            return res.json({ success: true, data: [] });

    });
});

router.post('/user', (req, res) => {
    const user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.name = req.body.name;
    user.password = req.body.password;
    user.age = req.body.age;
    user.bio = req.body.bio;
    user.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.put('/users/:userId', (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.json({ success: false, error: 'No user id provided' });
    }
    User.findById(userId, (error, user) => {
        if (error) return res.json({ success: false, error });
        user.username = req.body.username;
        user.email = req.body.email;
        user.name = req.body.name;
        user.password = req.body.password;
        user.age = req.body.age;
        user.bio = req.body.bio;
        user.save(error => {
            if (error) return res.json({ success: false, error });
            return res.json({ success: true });
        });
    });
});

router.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.json({ success: false, error: 'No user id provided' });
    }
    User.remove({ _id: userId }, (error, user) => {
        if (error) return res.json({ success: false, error });
        return res.json({ success: true });
    });
});

// Use our router configuration when we call /api
app.use('/api', router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
