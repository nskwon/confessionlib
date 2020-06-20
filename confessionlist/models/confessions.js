const mongoose = require('mongoose');

const ConfessionSchema = mongoose.Schema({
    confession:{
        type: String,
        required: true
    },
    date:{
        type: Date, default: Date.now
    }
});

const Confession = module.exports = mongoose.model('Confession', ConfessionSchema);