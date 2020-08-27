const user = require("../module/user");
const util = require("util");
const userId = "05399539cca9ac38db6db36f5c770ff1";

user.initialize(true, "remote");

user.getMailList(userId)
  .then((mailList) => {
    console.log("getMailList: %s", util.inspect(mailList, {depth: 6}));
  })
  .catch((err) => {
    console.error(`getMailList error: ${err}`);
  });

