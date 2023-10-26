const Event = require('../../schema/Admin/EventSchema');
const constant = require('../../config/Constant');
const { deleteImage } = require('../../helper/function');

exports.index = async (req, res) => {
    try {
        const getEvent = await Event.find().sort({ order: 1 });
        console.log(getEvent)

        res.status(200).json({
            status: true,
            message: constant.MSG_FOR_GET_EVENTS_DATA_SUCCESSFULLY,
            data: getEvent,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

exports.store = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.json({ status: false, message: 'All fields are required' });
        }

        const existingEvent = await Event.findOne({ name });

        if (existingEvent) {
            return res.json({ status: false, message: 'An event with the same name already exists' });
        }

        if(!req.file.filename){
            return res.json({ status: false, message: 'File is required' });
        }

        const eventData = {
            eventimg: req.file.filename,
            name: name,
            description: description,
        };

        const createdEvent = await Event.create(eventData);
        res.status(201).json({
            status: true,
            message: constant.MSG_FOR_EVENT_ADD_SUCCEESFULL,
            data: createdEvent,
        });
    } catch (error) {
        console.log({ status: false, message: error.message })
        res.json({ status: false, message: error.message });
    }
};



exports.show = async (req, res) => {
    try {
        const getEvent = await Event.findById(req.params.id);
        res.status(201).json({
            status: true,
            message: constant.MSG_FOR_GET_EVENTS_DATA_SUCCESSFULLY,
            data: getEvent,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedEvent = await Event.findById(id);

        if (!updatedEvent) {
            return res.json({ status: false, message: constant.MSG_FOR_EVENT_NOT_FOUND });
        }

        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({ status: false, message: 'All fields are required' });
        }

        const existingEvent = await Event.findOne({ name, _id: { $ne: id } });

        if (existingEvent) {
            return res.status(400).json({ status: false, message: 'An event with the same name already exists' });
        }

        if (req.file) {
            const imagePath = `public/images/events/${updatedEvent.eventimg}`;
            deleteImage(imagePath);
        }

        updatedEvent.eventimg = req.file ? req.file.filename : updatedEvent.eventimg;
        updatedEvent.name = name;
        updatedEvent.description = description;
        const savedEvent = await updatedEvent.save();

        res.status(200).json({
            status: true,
            message: constant.MSG_FOR_EVENT_UPDATE_SUCCEESFULL,
            data: savedEvent,
        });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};



exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            res.json({ status: false, message: constant.MSG_FOR_EVENT_NOT_FOUND });
        } else {
            const imagePath = `public/images/events/${deletedEvent.eventimg}`;
            deleteImage(imagePath);
            res.status(200).json({ status: true, message: constant.MSG_FOR_EVENT_DELETE_SUCCEESFULL });
        }
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};


//update the status using id
exports.statusChnage = (req, res) => {
    const eventId = req.params.id;
    const { status } = req.body;

    Event.findByIdAndUpdate(eventId, { status })
        .then(updatedUser => {
            res.json(updatedUser);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: constant.MSG_FOR_FAILED_UPDATE_STATUS });
        });
};


exports.reorder = async (req, res) => {
    try {
        const { newOrder } = req.body;

        for (let i = 0; i < newOrder.length; i++) {
            const eventId = newOrder[i];
            const event = await Event.findById(eventId);

            if (event) {
                event.order = i;
                await event.save();
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
        const count = await Event.countDocuments({});
        res.json({ count });
    } catch (error) {
        console.error('Error counting event:', error);
        res.status(500).json({ error: 'Could not count event' });
    }
};