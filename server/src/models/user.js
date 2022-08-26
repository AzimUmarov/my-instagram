const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
    firstName: {
        type: String,
        maxlength: 22,
        minlength: 4,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        maxlength: 22,
        minlength: 2,
        required: true,
        trim: true
    },
    username: {
        type: String,
        maxlength: 22,
        minlength: 2,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar:{
        type: String
    },
    accountType: {type: String, default: 'public'},
    birthDate: {
        type: Date
    },
    gender: {type: String, default: 'male'},
    mobile: {type: String},
    address: {type: String},
    bio: {
        type: String, 
        maxlength: 200
    },
    website: {type: String},
    followers: [{type: Types.ObjectId, ref: 'User'}],
    following: [{type: Types.ObjectId, ref: 'User'}],
    views: [{type: Types.ObjectId, ref: 'User'}],
    favorite: [{type: Types.ObjectId, ref: 'User'}],
    blocked: [{type: Types.ObjectId, ref: 'User'}],
    chats: [{type: Types.ObjectId, ref: 'Chat'}],
    tags: [{key: {type: String}, value: {type: String}}]
},
{
    timestamps: true
});

module.exports = model("User", userSchema);