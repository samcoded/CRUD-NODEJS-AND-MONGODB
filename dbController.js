const UserSchema = require("./dbModel");

const getAll = async (req, res) => {
  try {
    const users = await UserSchema.find();
    res.status(200).json({
      message: "Users retrieved",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
    });
  }
};
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserSchema.findById(id);
    res.status(200).json({
      message: "User retrieved",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
    });
  }
};

const createUser = async (req, res) => {
  const { name, email, country } = req.body;

  oldUser = await UserSchema.findOne({ email });
  if (oldUser) {
    res.status(400).json({
      message: "Email already exist",
      data: {},
    });
  }
  try {
    const user = { name, email, country };
    await UserSchema.create(user);
    res.status(200).json({
      message: "Successfully created user",
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
    });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, country } = req.body;
  try {
    const user = { name, email, country, _id: id };
    await UserSchema.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json({
      message: "Succcessfully updated User",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UserSchema.findByIdAndRemove(id);
    res.status(200).json({
      message: "User deleted successfully.",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
    });
  }
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
// module.exports = { getAll, createUser, deleteUser };
