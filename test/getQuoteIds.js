const user = require("../module/user");
const userId = "05399539cca9ac38db6db36f5c770ff1";
const key = "10"

user.initialize(true, "remote");

user.getQuoteIds(userId, key)
  .then((quoteIds) => {
    console.log("getQuoteIds: %o", quoteIds); 
  })
  .catch((err) => {
    console.error(`getQuoteIds error: ${err}`);
  });

