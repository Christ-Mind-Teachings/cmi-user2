const user = require("../module/user");
const userId = "05399539cca9ac38db6db36f5c770ff1";
const itemId = "q:10401000.055:1582683264281";

user.initialize(true, "remote");

user.deleteQuote(userId, itemId)
  .then((response) => {
    console.log("deleteQuote: %s", response) 
  })
  .catch((err) => {
    console.error(`deleteQuote error: ${err}`);
  });

