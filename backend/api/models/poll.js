import mongoose from 'mongoose';

const pollOptionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    }
});

const pollSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    options: {
        type: [pollOptionSchema],
        vaidate: [arrayLimit, '{PATH} exceeds the limit of 10'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
    },
});

function arrayLimit(val) {
    return val.length <= 10;
}

const pollModel = mongoose.model('poll', pollSchema)
export { pollModel }