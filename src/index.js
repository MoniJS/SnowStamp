let express = require("express");
let bodyParser = require("body-parser");
var moment = require('moment-timezone');
let path = require("path");
let app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const discordEpoch = 1420070400000;

app.get("/time-stamp", (req, res) => {
  const messageIdString = req.query.message;
  const id = BigInt.asUintN(64, messageIdString);
  const dateBits = Number(id >> 22n);

  const date = new Date(dateBits + discordEpoch);
  const unix = (dateBits + discordEpoch);
  console.log(`Unix - ${unix}`); //unix = Unix date
console.log(`ISO 8601 - ${date}`); //ISO 8601
  const time = moment.utc(date).format('MMMM Do YYYY, h:mm:ss a');
  const timeFormated = `${time} UTC`;
  res.send({timeFormated});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Port - ${port} | http://localhost:${port}`));
