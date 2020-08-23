const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The item name field is required']
    },
    category: {
        type: String,
        required: [true, 'The category field is required']
    },
    amount: {
        type: Number,
        required: [true, 'The amount field is required']
    },
    units: {
        type: String,
        required: [true, 'The units field is required']
    }
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;