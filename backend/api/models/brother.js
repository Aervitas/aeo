import mongoose from 'mongoose';

const brotherSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},  
    name: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: [String], required: false, default: []},
    admin: { type: Boolean, required: true, default: false },
});

const brotherModel = mongoose.model('brother', brotherSchema)
export { brotherModel }