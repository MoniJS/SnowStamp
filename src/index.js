let express = require("express");
let bodyParser = require("body-parser");
const moment = require('moment');

const discordEpoch = 1420070400000;

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/stamp", (req, res) => {
  const messageIdString = req.body.id;
  const id = BigInt.asUintN(64, messageIdString);
  const dateBits = Number(id >> 22n);

  const date = new Date(dateBits + discordEpoch);
  const time = moment.utc(date).format('MM/DD-YYYY kk:mm:ss')
  console.log(`${time} UTC`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));