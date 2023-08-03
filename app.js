require("dotenv").config();

const app = require("./server");
const PORT = process.env.PORT;
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("listening on port ", PORT);
});
