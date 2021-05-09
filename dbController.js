const mongoose = require("mongoose");
const EntrySchema = require("./dbModel");
const Joi = require("joi"); //validation

const getAll = async (req, res) => {
  try {
    const entries = await EntrySchema.find();
    res.status(200).json({
      message: "Entries retrieved",
      data: entries,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
    });
  }
};
const getEntry = async (req, res) => {
  const { id } = req.params;

  //check if ID is a valid mongodb ID
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({
      message: "Invalid ID",
      data: {},
    });

  try {
    const entry = await EntrySchema.findById(id);
    //check ID is in database
    if (!entry) {
      return res.status(400).json({
        message: "Invalid ID",
        data: {},
      });
    }
    res.status(200).json({
      message: "Entry retrieved",
      data: entry,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
    });
  }
};

const createEntry = async (req, res) => {
  const { name, email, country } = req.body;

  //check if email already exist
  const oldEntry = await EntrySchema.findOne({ email });
  if (oldEntry) {
    return res.status(400).json({
      message: "Email already exist",
      data: {},
    });
  }

  //validate input
  const entryschema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    country: Joi.string().required(),
  });

  try {
    await entryschema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
    });
  }

  //save entry to database
  try {
    const entry = { name, email, country };
    const save = await EntrySchema.create(entry);
    res.status(200).json({
      message: "Successfully created entry",
      data: save,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
    });
  }
};

const updateEntry = async (req, res) => {
  const { id } = req.params;
  const updatedEntry = req.body;

  //validate input
  const entryschema = Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    country: Joi.string(),
  });

  try {
    await entryschema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: {},
    });
  }

  //check if ID is a valid mongodb ID
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({
      message: "Invalid ID",
      data: {},
    });

  //check ID is in database
  const entryExist = await EntrySchema.findById(id);
  if (!entryExist)
    return res.status(400).json({
      message: "Invalid ID",
      data: {},
    });

  //update database
  try {
    const update = await EntrySchema.findByIdAndUpdate(id, updatedEntry, {
      new: true,
    });
    res.status(200).json({
      message: "Succcessfully updated entry",
      data: update,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
    });
  }
};

const deleteEntry = async (req, res) => {
  const { id } = req.params;

  //check if ID is a valid mongodb ID
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({
      message: "Invalid ID",
      data: {},
    });

  //check ID is in database
  const entryExist = await EntrySchema.findById(id);
  if (!entryExist)
    return res.status(400).json({
      message: "Invalid ID",
      data: {},
    });

  try {
    await EntrySchema.findByIdAndRemove(id);
    res.status(200).json({
      message: "Entry deleted successfully.",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
    });
  }
};

module.exports = { getAll, getEntry, createEntry, updateEntry, deleteEntry };
