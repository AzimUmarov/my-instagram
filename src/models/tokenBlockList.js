const { Schema, Types, model } = require("mongoose");

const tokenBlockListSchema = new Schema({
        token: {type: String}},
    {
        timestamps: true
    });

module.exports = model('TokenBlockList', tokenBlockListSchema);