const ProductStockAndSize = require('../../schema/Admin/ProductStockAndSizeschema');
const constant = require('../../config/Constant');

exports.index = async (req, res) => {
    try {
        const getProductStockAndSize = await ProductStockAndSize.find().sort({ order: 1 });

        res.status(200).json({
            status: true,
            message: constant.MSG_FOR_GET_PRODUCT_STOCK_SND_SIZE_DATA_SUCCESSFULLY,
            data: getProductStockAndSize,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

exports.store = async (req, res) => {
    try {
        const ProductStockAndSizeData = {
            size: req.body.size,
            stockQuantity: req.body.stockQuantity,
            productId: req.body.productId,
        };
        const createdProductStockAndSize = await ProductStockAndSize.create(ProductStockAndSizeData);
        res.status(201).json({
            status: true,
            message: constant.MSG_FOR_PRODUCT_STOCK_SND_SIZE_ADD_SUCCEESFULL,
            data: createdProductStockAndSize,
        });
    } catch (error) {
        console.log({ status: false, message: error.message })
        res.json({ status: false, message: error.message });
    }
};

exports.show = async (req, res) => {
    try {
        const getProductStockAndSize = await ProductStockAndSize.findById(req.params.id);
        res.status(201).json({
            status: true,
            message: constant.MSG_FOR_GET_PRODUCT_STOCK_SND_SIZE_DATA_SUCCESSFULLY,
            data: getProductStockAndSize,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProductStockAndSize = await ProductStockAndSize.findById(id);

        if (!updatedProductStockAndSize) {
            return res.json({ status: false, message: constant.MSG_FOR_PRODUCT_STOCK_SND_SIZE_NOT_FOUND });
        }

        updatedProductStockAndSize.size = req.body.size;
        updatedProductStockAndSize.stockQuantity = req.body.stockQuantity;
        updatedProductStockAndSize.productId = req.body.productId;
        const savedProductStockAndSize = await updatedProductStockAndSize.save();

        res.status(200).json({
            status: true,
            message: constant.MSG_FOR_PRODUCT_STOCK_SND_SIZE_UPDATE_SUCCEESFULL,
            data: savedProductStockAndSize,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProductStockAndSize = await ProductStockAndSize.findByIdAndDelete(id);
        if (!deletedProductStockAndSize) {
            res.json({ status: false, message: constant.MSG_FOR_PRODUCT_STOCK_SND_SIZE_NOT_FOUND });
        } else {
            res.status(200).json({ status: true, message: constant.MSG_FOR_PRODUCT_STOCK_SND_SIZE_DELETE_SUCCEESFULL });
        }
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};


//update the status using id
exports.statusChnage = (req, res) => {
    const productStockAndSizeId = req.params.id;
    const { status } = req.body;

    ProductStockAndSize.findByIdAndUpdate(productStockAndSizeId, { status })
        .then(updatedUser => {
            res.json({ status: true, updatedUser: updatedUser});
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ status: false, error: constant.MSG_FOR_FAILED_UPDATE_STATUS });
        });
};

exports.counts = async (req, res) => {
    try {
        const count = await ProductStockAndSize.countDocuments({});
        res.json({ status: true, count: count });
    } catch (error) {
        res.status(500).json({ status: false, error: 'Could not count ProductStockAndSize' });
    }
};