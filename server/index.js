const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const moviesRoute = require("./routes/movies");
const listsRoute = require("./routes/lists");
const todos = require("./routes/todos");
const db = require("./models");
let corsOptions = {
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

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB conection successfull"))
.catch((error) => console.error(error));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/lists", listsRoute);
app.use("/api/todos", todos);

app.listen(PORT, () => {
  console.log(`Server runnig at port ${PORT}`);
});

