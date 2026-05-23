const Expert = require("../models/Expert");

// Create Expert
const createExpert = async (req, res) => {
  try {
    const expert = await Expert.create(req.body);

    res.status(201).json(expert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Experts
const getExperts = async (req, res) => {
  try {
    const experts = await Expert.find();

    res.status(200).json(experts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExpert,
  getExperts,
};