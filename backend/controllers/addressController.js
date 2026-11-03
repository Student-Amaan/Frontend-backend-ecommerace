const Address = require("../models/Address");

const saveAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.json({ message: "Address save sucessfully ", address });
  } catch (error) {
    res.status(500).json({
      message: "Error saving address",
      error,
    });
  }
};

const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.params.userId });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Address",
      error,
    });
  }
};

module.exports = {
  saveAddress,
  getAddress,
};
