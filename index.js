require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// TODO routes link here
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const authRoute = require("./routes/auth");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("images"));
app.use("/api/product", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

mongoose.connect("mongodb://localhost/diplom", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

const PORT = 8080;
app.listen(PORT, () => console.log("server started - " + PORT));
