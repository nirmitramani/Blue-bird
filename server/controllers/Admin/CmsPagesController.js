const CmsPage = require('../../schema/Admin/CmsPageSchema');
const constant = require('../../config/Constant');

exports.index = async (req, res) => {
    try {
        const getCmsPages = await CmsPage.find().sort({ createdAt: -1 });

        res.status(200).json({
            status: true,
            message: constant.MSG_FOR_GET_FAQS_DATA_SUCCESSFULLY,
            data: getCmsPages,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};


exports.show = async (req, res) => {
    try {
        const getCmsPages = await CmsPage.findById(req.params.id);
        res.status(201).json({
            status: true,
            message: constant.MSG_FOR_GET_FAQS_DATA_SUCCESSFULLY,
            data: getCmsPages,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};


exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCms = await CmsPage.findById(id);

        if (!updatedCms) {
            return res.json({ status: false, message: constant.MSG_FOR_FAQS_NOT_FOUND });
        }

        if (!req.body.title || !req.body.description) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }

        const existingCms = await CmsPage.findOne({ title: req.body.title, _id: { $ne: id } });

        if (existingCms) {
            return res.status(400).json({ status: false, message: 'A page with the same title already exists' });
        }

        updatedCms.title = req.body.title;
        updatedCms.description = req.body.description;
        await updatedCms.save();

        res.status(200).json({
            status: true,
            message: constant.MSG_FOR_FAQS_UPDATE_SUCCEESFULL,
            data: updatedCms,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};


exports.counts = async (req, res) => {
    try {
        const count = await CmsPage.countDocuments({});
        res.json({ count });
    } catch (error) {
        console.error('Error counting CmsPage:', error);
        res.status(500).json({ error: 'Could not count CmsPage' });
    }
};