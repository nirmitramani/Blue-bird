const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
   
    userId: {
        type: String,
        required: true,
    },
    couponId: {    
        type: String,
    },
    discountAmount: {    
        type: Number,
    },
    orderDate: {
        type: Date,
    },
    paymentType: {
        type: String,
        enum: ['Online', 'COD'],
        required: true,
        default: 'COD'
    },
    status: {
        type: String,
        enum: ['Pendding', 'Deliverd', 'Cancel'],
        required: true,
        default: 'Pendding'
    }
},
    { 
        timestamps: true ,
        versionKey: false
    }
);

module.exports = mongoose.model('orders', OrderSchema);
