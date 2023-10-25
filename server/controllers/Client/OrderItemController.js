const OrderItem = require('../../schema/Client/OrderItemSchema');
const constant = require('../../config/Constant');

exports.index = async (req, res) => {
    try {
        const getOrderItem = await OrderItem.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: true,
            message: constant.MSG_FOR_GET_ORDERITEM_DATA_SUCCESSFULLY,
            data: getOrderItem,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

exports.store = async (req, res) => {
    try {
        const { orderId, productId, quantity, amount } = req.body;
        const OrderItemData = {
            orderId: orderId,
            productId: productId,
            quantity: quantity,
            amount: amount,
        };
        const createdOrderItem = await OrderItem.create(OrderItemData);
        res.status(201).json({
            status: true,
            message: constant.MSG_FOR_ORDERITEM_ADD_SUCCEESFULL,
            data: createdOrderItem,
        });
    } catch (error) {
        console.log({ status: false, message: error.message })
        res.json({ status: false, message: error.message });
    }
};

exports.show = async (req, res) => {
    try {
        const getOrderItem = await OrderItem.findById(req.params.id);
        res.status(201).json({
            status: true,
            message: constant.MSG_FOR_GET_ORDERITEM_DATA_SUCCESSFULLY,
            data: getOrderItem,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const {orderId, productId, quantity, amount} = req.body;

    try {
        const updatedOrderItem = await OrderItem.findById(id);

        if (!updatedOrderItem) {
            return res.json({ status: false, message: constant.MSG_FOR_ORDERITEM_NOT_FOUND });
        }
        updatedOrderItem.orderId = orderId;
        updatedOrderItem.productId = productId;
        updatedOrderItem.quantity = quantity;
        updatedOrderItem.amount = amount;
        const savedOrderItem = await updatedOrderItem.save();

        res.status(200).json({
            status: true,
            message: constant.MSG_FOR_ORDERITEM_UPDATE_SUCCEESFULL,
            data: savedOrderItem,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrderItem = await OrderItem.findByIdAndDelete(id);
        if (!deletedOrderItem) {
            res.json({ status: false, message: constant.MSG_FOR_ORDERITEM_NOT_FOUND });
        } else {
            res.status(200).json({ status: true, message: constant.MSG_FOR_ORDERITEM_DELETE_SUCCEESFULL });
        }
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};


//update the status using id
exports.statusChnage = (req, res) => {
    const faqId = req.params.id;
    const { status } = req.body;

    OrderItem.findByIdAndUpdate(faqId, { status })
        .then(updatedOrderItem => {
            res.json({status: true, updatedOrderItem: updatedOrderItem});
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ status: false, error: 'Failed to update status' });
        });
};