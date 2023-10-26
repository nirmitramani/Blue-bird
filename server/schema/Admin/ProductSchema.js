const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    categoryid: {
        type: String,
        required: true
    },
    productimg: {
        type: String,
        required: true
    },
    productthumbimg: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true,
        default: 'Active'
    },
    order: {
        type: Number,
        required: true,
        default: 0
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('products', productSchema);