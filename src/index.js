let express = require("express");
let bodyParser = require("body-parser");
let moment = require("moment");
let path = require("path");
let app = express();

const discordEpoch = 1420070400000;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.get("/timeStamp", (req, res) => {
  const messageIdString = req.query.message;
  console.log(messageIdString);
  console.log(typeof messageIdString);
  const id = BigInt.asUintN(64, messageIdString);
  const dateBits = Number(id >> 22n);

  let date = new Date(dateBits + discordEpoch);
  const timeF = moment.utc(date).format("MM/DD-YYYY kk:mm:ss");
  let time = `${timeF} UTC`;
  res.send({time});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
