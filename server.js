const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./config/dbConnection");

dbConnection();
const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(errorHandler);
app.use('/', require('./routes/userRoute'));
app.use('/', require('./routes/cartDataRoute'));



app.listen(port, () =>{
  console.log(`sever is running on ${port}`);
});