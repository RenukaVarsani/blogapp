const express = require("express");
var randomstring = require("randomstring");
const bodyParser = require('body-parser');
const nodemailer= require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const cors = require('cors')
const db = require("./db/db");
const userRouter = require('./routing/user')
const blogRouter = require('./routing/blog')
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
// app.useCors(options => options.AllowAnyOrigin);

// response.setHeader("Access-Control-Allow-Origin", "*");
// response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
// response.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT,OPTIONS");
// response.setHeader("Access-Control-Allow-Headers", "*");

app.use(userRouter)
app.use(blogRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
