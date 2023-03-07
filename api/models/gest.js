// schema to creat gest
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gestSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true,unique: true },

}, { timestamps: true });


module.exports = mongoose.model("Gest", gestSchema);