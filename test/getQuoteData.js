const user = require("../module/user");
const util = require("util");
const userId = "05399539cca9ac38db6db36f5c770ff1";
const itemId = "10401000.055:1582683264281";

user.initialize(true, "remote");

user.getQuoteData(userId, itemId)
  .then((quote) => {
    console.log("getQuoteData: %s", util.inspect(quote, {depth: 6}));
  })
  .catch((err) => {
    console.error(`getQuoteData error: ${err}`);
  });

