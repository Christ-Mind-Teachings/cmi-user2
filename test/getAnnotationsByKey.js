const user = require("../src/module/user");
const util = require("util");

const userId = "05399539cca9ac38db6db36f5c770ff1";
const parakey = "10";
const topic = "World";

user.initialize(true, "remote");

user.getAnnotationsByKey(userId, parakey, topic)
  .then((quote) => {
    console.log("getAnnotationsByKey: %s", util.inspect(quote, {depth: 6}));
  })
  .catch((err) => {
    console.error(`getAnnotationsByKey error: ${err}`);
  });

