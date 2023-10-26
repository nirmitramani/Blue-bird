const User = require('../../schema/Client/UserSchema');
const constant = require('../../config/Constant');
const { deleteImage } = require('../../helper/function');
const bcrypt = require('bcrypt');

exports.index = async (req, res) => {
  try {
    const getUser = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      message: constant.MSG_FOR_GET_USER_DATA_SUCCESSFULLY,
      data: getUser,
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

exports.show = async (req, res) => {
  try {
    const getUser = await User.findById(req.params.id);
    res.status(201).json({
      status: true,
      message: constant.MSG_FOR_GET_USER_DATA_SUCCESSFULLY,
      data: getUser,
    });
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    if (req.file) {
      if (req.file.fieldname === 'profileimg') {
        const oldProfileImagePath = `public/images/user/${existingUser.profileimg}`;
        deleteImage(oldProfileImagePath);
        existingUser.profileimg = req.file.filename;
      }
    }

    existingUser.userName = req.body.userName;
    existingUser.email = req.body.email;
    existingUser.phone = req.body.phone;
    existingUser.gender = req.body.gender;

    const updatedUser = await existingUser.save();

    return res.status(200).json({
      status: true,
      message: constant.MSG_FOR_USER_UPDATE_SUCCEESFULL,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.json({ status: false, message: constant.MSG_FOR_USER_NOT_FOUND });
    } else {
      res.status(200).json({ status: true, message: constant.MSG_FOR_USER_DELETE_SUCCEESFULL });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

//update the status using id
exports.statusChnage = (req, res) => {
  const userId = req.params.id;
  const { status } = req.body;

  User.findByIdAndUpdate(userId, { status })
    .then(updatedUser => {
      res.json({ status: true, data: updatedUser });
    })
    .catch(err => {
      res.status(500).json({ error: constant.MSG_FOR_FAILED_UPDATE_STATUS });
    });
};

exports.counts = async (req, res) => {
  try {
    const count = await User.countDocuments({});
    res.json({ count });
  } catch (error) {
    console.error('Error counting event:', error);
    res.status(500).json({ error: 'Could not count event' });
  }
};

exports.changePassword = async (req, res) => {
  const { id } = req.params;
  try {
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.oldPassword, existingUser.password);

    if (!isPasswordValid) {
      return res.json({ status: false, message: 'Old password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    existingUser.password = hashedPassword;

    const updatedUser = await existingUser.save();

    return res.status(200).json({
      status: true,
      message: constant.MSG_FOR_USER_UPDATE_SUCCESSFUL,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
