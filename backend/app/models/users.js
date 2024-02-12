const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const nameRegex = /^[a-zA-Z]{2,}$/;

const validateEmail = [email =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}, 'invalid email']

const validateFirstName = [fName =>{
    return nameRegex.test(fName);
}, 'invalid first name']

const validateLastName = [lName =>{
    return nameRegex.test(lName);
}, 'invalid last name']

const userSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    passHash: { type: String, required: true },
    fName: { type: String, required: true, validate: validateFirstName},
    lName: { type: String, required: true, validate: validateLastName},
    email: { type: String, required: true, unique: true, validate: validateEmail },
    createdAt: { type: Date, default: Date.now},
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sentRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sharedLists: [{
        access: {type: String, enum: ['read', 'write']},
        list: {type: Schema.Types.ObjectId, ref: 'List'}
    }]
});

const User = model('User', userSchema);
module.exports = User;
