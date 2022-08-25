const { Schema, Types, model } = require("mongoose");

const chatSchema = new Schema({
    title: {
        type: String
    },
    creator: [{type: Types.ObjectId, ref: 'User'}],
    participants:  [{type: Types.ObjectId, ref: 'User'}],
    messages:  [{type: Types.ObjectId, ref: 'Message'}],
},
{
    timestamps: true
});

module.exports = model('Chat', chatSchema);