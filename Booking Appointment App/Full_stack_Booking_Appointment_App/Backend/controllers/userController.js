const User = require('../models/user');

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.destroy({
      where: { id: userId }
    });

    if (deleted) {
      res.json({ message: `User with ID ${userId} deleted successfully.` });
    } else {
      res.status(404).json({ error: `User with ID ${userId} not found.` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};