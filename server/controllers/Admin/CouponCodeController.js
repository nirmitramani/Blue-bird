const CouponCode = require('../../schema/Admin/CouponCodeSchema');
const constant = require('../../config/Constant');

exports.index = async (req, res) => {
    try {
        const getCouponCode = await CouponCode.find().sort({ order: 1 });

        res.status(200).json({
            status: true,
            message: constant.MSG_FOR_GET_COUPON_CODE_DATA_SUCCESSFULLY,
            data: getCouponCode,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

exports.store = async (req, res) => {
    try {
        const { title, code, description, discount, maxDiscount, minimumOrderValue, startDate, endDate } = req.body;

        if (!title || !code || !description || !discount || !maxDiscount || !minimumOrderValue || !startDate || !endDate) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }

        const existingTitleCoupon = await CouponCode.findOne({ title });
        if (existingTitleCoupon) {
            return res.status(400).json({ status: false, message: 'A coupon code with the same title already exists' });
        }

        const existingCodeCoupon = await CouponCode.findOne({ code });
        if (existingCodeCoupon) {
            return res.status(400).json({ status: false, message: 'A coupon code with the same code already exists' });
        }

        const CouponCodeData = {
            title: title,
            code: code,
            description: description,
            discount: discount,
            maxDiscount: maxDiscount,
            minimumOrderValue: minimumOrderValue,
            startDate: startDate,
            endDate: endDate,
        };
        const createdCouponCode = await CouponCode.create(CouponCodeData);
        res.status(201).json({
            status: true,
            message: constant.MSG_FOR_COUPON_CODE_ADD_SUCCEESFULL,
            data: createdCouponCode,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};


exports.show = async (req, res) => {
    try {
        const getCouponCode = await CouponCode.findById(req.params.id);
        res.status(201).json({
            status: true,
            message: constant.MSG_FOR_GET_COUPON_CODE_DATA_SUCCESSFULLY,
            data: getCouponCode,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const { title, code, description, discount, maxDiscount, minimumOrderValue, startDate, endDate } = req.body;

        if (!title || !code || !description || !discount || !maxDiscount || !minimumOrderValue || !startDate || !endDate) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }
        
        const updatedCouponCode = await CouponCode.findById(id);

        if (!updatedCouponCode) {
            return res.json({ status: false, message: constant.MSG_FOR_COUPON_CODE_NOT_FOUND });
        }

        const existingTitleCoupon = await CouponCode.findOne({ title, _id: { $ne: id } });
        if (existingTitleCoupon) {
            return res.status(400).json({ status: false, message: 'A coupon code with the same title already exists' });
        }

        const existingCodeCoupon = await CouponCode.findOne({ code, _id: { $ne: id } });
        if (existingCodeCoupon) {
            return res.status(400).json({ status: false, message: 'A coupon code with the same code already exists' });
        }

        updatedCouponCode.title = title;
        updatedCouponCode.code = code;
        updatedCouponCode.description = description;
        updatedCouponCode.discount = discount;
        updatedCouponCode.maxDiscount = maxDiscount;
        updatedCouponCode.minimumOrderValue = minimumOrderValue;
        updatedCouponCode.startDate = startDate;
        updatedCouponCode.endDate = endDate;
        const savedCouponCode = await updatedCouponCode.save();

        res.status(200).json({
            status: true,
            message: constant.MSG_FOR_COUPON_CODE_UPDATE_SUCCEESFULL,
            data: updatedCouponCode,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};


exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCouponCode = await CouponCode.findByIdAndDelete(id);
        if (!deletedCouponCode) {
            res.json({ status: false, message: constant.MSG_FOR_COUPON_CODE_NOT_FOUND });
        } else {
            res.status(200).json({ status: true, message: constant.MSG_FOR_COUPON_CODE_DELETE_SUCCEESFULL });
        }
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};


//update the status using id
exports.statusChnage = (req, res) => {
    const faqId = req.params.id;
    const { status } = req.body;

    CouponCode.findByIdAndUpdate(faqId, { status })
        .then(updatedUser => {
            res.json(updatedUser);
        })
        .catch(err => {
            res.status(500).json({ error: constant.MSG_FOR_FAILED_UPDATE_STATUS });
        });
};

exports.reorder = async (req, res) => {
    try {
        const { newOrder } = req.body;
        for (let i = 0; i < newOrder.length; i++) {
            const couponcodeId = newOrder[i];
            const couponcode = await CouponCode.findById(couponcodeId);

            if (couponcode) {
                couponcode.order = i;
                await couponcode.save();
            }
        }
        res.status(200).json({ message: constant.MSG_FOR_TABLE_ORDER_UPDATE_SUCCESSFULL });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: constant.MSG_FOR_INTERNAL_SERVER_ERROR });
    }
};

exports.counts = async (req, res) => {
    try {
        const count = await CouponCode.countDocuments({});
        res.json({ count });
    } catch (error) {
        console.error('Error counting :', error);
        res.status(500).json({ error: 'Could not count ' });
    }
};