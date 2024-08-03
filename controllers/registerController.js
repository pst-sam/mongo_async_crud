const User = require('../model/User');
const bcrypt = require('bcryptjs');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        //encrypt the password
        const hashedpwd = await bcrypt.hash(pwd, 10);

        //create and store the new user
        const result = await User.create({
            "username": user,
            "password": hashedpwd
        });
        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created!` });

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

module.exports = { handleNewUser, getAllUsers };