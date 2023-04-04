const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require("./db/db");
const userRouter = require('./routing/user')
const blogRouter = require('./routing/blog')
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(bodyParser.json()); 
app.use(cors())

app.use('/users',userRouter)
app.use('/blogs',blogRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
