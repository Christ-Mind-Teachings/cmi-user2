const user = require("../module/user");
const util = require("util");
const userId = "05399539cca9ac38db6db36f5c770ff1";

user.initialize(true, "remote");

user.getTopicList(userId, "10")
  .then((topics) => {
    console.log("getTopicList: %s", util.inspect(topics, {maxArrayLength: 300, depth: 6}));
  })
  .catch((err) => {
    console.error(`getTopicList error: ${err}`);
  });

