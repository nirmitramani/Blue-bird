const Order = require('../../schema/Client/OrderSchema');
const OrderItem = require('../../schema/Client/OrderItemSchema');
const PaymentDetail = require('../../schema/Client/PaymentDetailSchema');
const constant = require('../../config/Constant');

exports.index = async (req, res) => {
    try {
        const getOrder = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: true,
            message: constant.MSG_FOR_GET_ORDER_DATA_SUCCESSFULLY,
            data: getOrder,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

exports.store = async (req, res) => {
    try {
        const { userId, couponId, discountAmount, orderDate, paymentType, orderStatus, products, totalAmount, codPaymentType, onlinPaymentId, bankPaymentId, paymentStatus } = req.body;

        if (!userId || !couponId || !discountAmount || !orderDate || !paymentType || !orderStatus || !products || !totalAmount || !codPaymentType || !onlinPaymentId || !bankPaymentId || !paymentStatus) {
            return res.status(400).json({
                status: false,
                message: "All fields are required.",
            });
        }

        if (!products || products.length === 0) {
            return res.status(400).json({
                status: false,
                message: "At least one product must be included in the order.",
            });
        }

        for (const product of products) {
            if (!product.productId || !product.quantity || product.quantity <= 0) {
                return res.status(400).json({
                    status: false,
                    message: "Each product must have a valid productId and a quantity greater than 0.",
                });
            }
        }

        const OrderData = {
            userId: userId.trim(),
            couponId: couponId.trim(),
            discountAmount: discountAmount.trim(),
            orderDate: orderDate.trim(),
            paymentType: paymentType.trim(),
            status: orderStatus.trim(),
        };
        const createdOrder = await Order.create(OrderData);

        const orderItems = products.map(product => {
            return {
                orderId: createdOrder._id.trim(),
                productId: product.productId.trim(),
                quantity: product.quantity.trim(),
                amount: product.amount.trim(),
            };
        });
        const orderItem = await OrderItem.insertMany(orderItems);

        const PaymentData = {
            totalAmount: totalAmount.trim(),
            paymentType: codPaymentType.trim(),
            onlinPaymentId: onlinPaymentId.trim(),
            bankPaymentId: bankPaymentId.trim(),
            paymentStatus: paymentStatus.trim(),
        };
        const orderPayment = await Order.create(PaymentData);

        res.status(201).json({
            status: true,
            message: constant.MSG_FOR_ORDER_ADD_SUCCEESFULL,
            data: {
                createdOrder: createdOrder,
                orderItem: orderItem,
                orderPayment: orderPayment
            },
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};


exports.show = async (req, res) => {
    try {
        const getOrder = await Order.findById(req.params.id);
        const getOrderItem = await OrderItem.find({ orderId: req.params.id });
        const getPaymentDetail = await PaymentDetail.findOne({ orderId: req.params.id });

        res.status(201).json({
            status: true,
            message: constant.MSG_FOR_GET_ORDER_DATA_SUCCESSFULLY,
            data: {
                order: getOrder,
                orderItem: getOrderItem,
                paymentDetail: getPaymentDetail
            },
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        const orderItem = await OrderItem.insertMany(deletedOrder.orderId);
        const orderPayment = await Order.create(deletedOrder.orderId);

        if (!deletedOrder) {
            res.json({ status: false, message: constant.MSG_FOR_ORDER_NOT_FOUND });
        } else {
            res.status(200).json({ status: true, message: constant.MSG_FOR_ORDER_DELETE_SUCCEESFULL });
        }

    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

exports.statusChnage = (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    Order.findByIdAndUpdate(orderId, { status })
        .then(updatedOrder => {
            res.json({ status: true, updatedOrder: updatedOrder });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ status: false, error: 'Failed to update status' });
        });
};

exports.counts = async (req, res) => {
    try {
        const count = await Order.countDocuments({});
        res.json({ status: true, data: count });
    } catch (error) {
        res.status(500).json({ status: false, error: 'Could not count event' });
    }
};