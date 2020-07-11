const mongoose = require('mongoose');

const ConfessionSchema = mongoose.Schema({
    submission:{
        type: String,
        required: true
    },
    date:{
        type: Date, default: Date.now
    },
    reportCount:{
        type: Number, default: 0
    }
});

const Confession = module.exports = mongoose.model('Confession', ConfessionSchema);