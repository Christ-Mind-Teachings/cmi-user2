const user = require("../module/user");
const util = require("util");
const userId = "05399539cca9ac38db6db36f5c770ff1";

user.initialize(true, "remote");

user.deleteTopicList(userId, "10")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(`deleteTopicList error: ${err}`);
  });

