const { Schema, model, Types } = require("mongoose");

const postSchema = new Schema({
    media: {
        type: {type: String},
        medias: [{type: String}]
    },
    description: {
        type: String,
        maxlength: 1000,
        required: true
    },
    tags: [{key: {type: String}, value: {type: String}}],
    creator: [{type: Types.ObjectId, ref: 'User'}],
    repostings:  [{type: Types.ObjectId, ref: 'User'}],
    sharings:  [{type: Types.ObjectId, ref: 'User'}],
    likes: [{type: Types.ObjectId, ref: 'User'}],
    views: [{type: Types.ObjectId, ref: 'User'}],
    comments: [{type: Types.ObjectId, ref: 'Comment'}],
    mentions: [{type: Types.ObjectId, ref: 'User'}],
    hashtags: [{type: Types.ObjectId, ref: 'Hashtag'}]
},
{
    timestamps: true
});

module.exports = model("Post", postSchema);