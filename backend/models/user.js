import mongoose from 'mongoose';

var mongooseUniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true},
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    bio: {type: String, required: true}
}, { timestamps: true });

// apply data uniqueness validation
userSchema.plugin(mongooseUniqueValidator);

// export our module to use in server.js
export default mongoose.model('User', userSchema);