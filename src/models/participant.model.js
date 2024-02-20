const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')
const {hash} = require("bcrypt");
const roles = require("./enums/participant.enum")
require('dotenv').config()

const schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, 'is invalid']},
    password: {type: String, required: true},
    club: {
        type: Schema.Types.ObjectId,
        ref: "Club"
    },
    role: {type: String, roles , default: roles.ADMIN},
}, {timestamps: true})

// A dependency used to validate unique attribute in a more efficient way
schema.plugin(uniqueValidator);


/**
 * Generate a password and crypt it
 * */
schema.methods.setPassword = async function () {
    // set the password to be the firstName lowercase with the last 4 char of the user Id
    let newId = this._id.toString().length;
    this.password = this.firstName.toLowerCase() + this._id.toString().slice(newId - 4);
    // We hash the password
    // hash method of bcrypt take some time, we have to await it then set the password hashed
    await bcrypt.hash(this.password, Number.parseInt(process.env.CRYPT_SALT)).then(hash => {
        this.password = hash;
    }).catch(err => ({err}));
}

schema.methods.verifyPassword = async function (password) {
    let validation = false;
    await bcrypt.compare(password, this.password).then(valid => {
        validation = valid
    }).catch(error => ({error}))
    return validation;
}

schema.methods.generateToken = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('Participant', schema)// | setPasswordC
