const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find().select('-password').lean();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}


module.exports = { getAllUsers };