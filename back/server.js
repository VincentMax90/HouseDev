const express = require("express");
const db = require("./config/db.js");
const routes = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api", routes);

db.sync({ force: false }).then(() => {
  console.log("db conected");
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
