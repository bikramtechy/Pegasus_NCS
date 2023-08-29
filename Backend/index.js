const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const ConnectDb = require("./dbConnect");
const app = express();
require("dotenv").config({ path: `${__dirname}/.env` });
const Token = require("./helper/token");
var encryptDecrypt = require("./helper/encryptDecrypt");
const port = 9003;
app.use(express.json());
ConnectDb();
app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
app.use((req, res, next) => {
  next();
});

app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
