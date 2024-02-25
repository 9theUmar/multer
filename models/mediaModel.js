const mongoose = require("mongoose");

const mediaModel = new mongoose.Schema({
    username: String,
    avatar: String,
});

module.exports = mongoose.model("media", mediaModel);