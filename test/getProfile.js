const user = require("../module/user");
const util = require("util");
const userId = "05399539cca9ac38db6db36f5c770ff1";

user.initialize(true, "remote");

user.getProfile(userId)
  .then((profile) => {
    console.log("getProfile: %s", util.inspect(profile, {depth: 6}));
  })
  .catch((err) => {
    console.error(`getProfile error: ${err}`);
  });

