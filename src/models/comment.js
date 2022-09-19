const { Schema, Types, model } = require("mongoose");

const commentSchema = new Schema({
    body: {type: String},
    creator: {type: Types.ObjectId, ref: 'User'},
    post: {type: Types.ObjectId, ref: 'Post'},
    likes: [{type: Types.ObjectId, ref: 'User'}],
    isReplies: [{type: Types.ObjectId, ref: 'Comment', default: null}],
    mentions: [{type: Types.ObjectId, ref: 'User'}],
    hashtags: [{type: Types.ObjectId, ref: 'hashtag'}]
},
{
    timestamps: true
});

module.exports = model('Comment', commentSchema);