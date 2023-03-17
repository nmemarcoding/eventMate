const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoute = require("./routes/auth.js");
const eventRoute = require("./routes/event.js");
const emailRoute = require("./routes/email.js");

require('dotenv').config();

const app = express();

// use cors
app.use(cors());

// use body-parser
app.use(bodyParser.json());

// connect to mongodb
mongoose
    .connect("mongodb+srv://nmemarcoding:Nima1377@cluster0.xazcszj.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
})

// use routes
app.use("/api/auth", authRoute);
app.use("/api/event", eventRoute);
app.use("/api/email", emailRoute);



const port = process.env.PORT || 3002;

// start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
