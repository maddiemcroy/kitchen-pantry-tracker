const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The item name field is required']
    },
    quantity: {
        type: Number,
        required: [false]
    },
    category: {
        type: String,
        required: [false]
    },
    amount: {
        type: Number,
        required: [false]
    },
    units: {
        type: String,
        required: [false]
    }
});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;