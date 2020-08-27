const user = require("../module/user");
const util = require("util");

const userId = "05399539cca9ac38db6db36f5c770ff1";
const parakey = "10401";

user.initialize(true, "remote");

user.getAnnotationsByKey(userId, parakey)
  .then((quote) => {
    console.log("getAnnotationsByKey: %s", util.inspect(quote, {depth: 6}));
  })
  .catch((err) => {
    console.error(`getAnnotationsByKey error: ${err}`);
  });

