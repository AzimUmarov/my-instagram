const { Schema, Types, model } = require("mongoose");

const messageSchema = new Schema({
    body: {type: String},
    creator: {type: Types.ObjectId, ref: 'User'},
    chat: {type: Types.ObjectId, ref: 'Chat'},
    likes: [{type: Types.ObjectId, ref: 'User'}]
},
{
    timestamps: true
});

module.exports = model("Message", messageSchema);