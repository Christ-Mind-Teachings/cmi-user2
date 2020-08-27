const db = require("../module/user");

const userId = "05399539cca9ac38db6db36f5c770ff1";
const itemId = "q:10401000.055:1582683264281";
const quote = {
  pid: "p16",
  quote: "Somewhere beyond right and wrong there is a field. I will meet you there.",
  citation: "Rumi",
  url: "/t/wom/nowwhere"
};

db.initialize(true, "remote");

db.putQuote(userId, itemId, quote)
  .then((result) => {
    console.log("putQuote: ", result);
  })
  .catch((err) => {
    console.error(`putQuote error: ${err}`);
  });

