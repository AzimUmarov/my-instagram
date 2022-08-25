const { Schema, Types } = require("mongoose");

const messageSchema = new Schema({
    body: {
        type: {type: String},
        media: [{type: String}]
    },
    creator: [{type: Types.ObjectId, ref: 'User'}],
    chat: [{type: Types.ObjectId, ref: 'Chat'}]
},
{
    timestamps: true
});

module.exports = module("Message", messageSchema);