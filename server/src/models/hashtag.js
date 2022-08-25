const { Schema, Types } = require("mongoose");

const hashtagSchema = new Schema({
    name:{type: String},
    posts: [{type : Types.ObjectId, ref : "Post"}],
    users: [{type: Types.ObjectId, ref: "User"}]
},
{
    timestamps: true
});

module.exports = module("Message", hashtagSchema);