// schema to creat new event 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    host: { type: mongoose.Schema.Types.ObjectId,
            ref: 'User',required: true },
    title: { type: String, required: true,reuired: true },
    description: { type: String, required: true,required: true },
    date: { type: String, required: true,required: true },
    time: { type: String, required: true,required: true },
    location: { type: String, required: true,required: true },
    // gest list reference to gest schema
    gestList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gest' }],
    // accepted gest list reference to gest schema
    acceptedGestList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gest' }],


}, { timestamps: true });


module.exports = mongoose.model("Event", eventSchema);
