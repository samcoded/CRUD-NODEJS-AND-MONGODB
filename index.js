const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//LOAD CONTROLLERS
const {
  getAll,
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
} = require("./dbController");

//API ROUTES
app.post("/", createEntry);
app.get("/:id", getEntry);
app.get("/", getAll);
app.put("/:id", updateEntry);
app.delete("/:id", deleteEntry);

//CONNECT DATABASE
const CONNECTION_URL = process.env.MONGOURL;
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("Database connected"))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);

//START SERVER ON PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on Port: http://localhost:${PORT}`);
});
