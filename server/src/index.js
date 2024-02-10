const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const dotenv = require("dotenv");
const todos = require("./routes/todos");
const db = require("./models");
const corsOptions = {
  AccessControlAllowOrigin: '*',
  origin: "http://127.0.0.1:5173/",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};

const app = express();
const PORT = process.env.SERVER_PORT || 8080;

app.use(cors(corsOptions));

db.sequelize.sync()
.then(() => {
  console.log('Postgress DB Sync');
})
.catch((error) => {
  console.log('Postgress DB Error', error)
});



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

dotenv.config();

app.use("/api/todos", todos);

app.listen(PORT, () => {
  console.log(`Server runnig at port ${PORT}`);
});

