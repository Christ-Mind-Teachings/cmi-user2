const db = require("../module/user");

const userId = "05399539cca9ac38db6db36f5c770ff1";
const profile = {
  name: "Rick Mercer",
  email: "rmercer33@gmail.com"
};

db.initialize(true, "remote");

db.putProfile(userId, profile)
  .then((result) => {
    console.log("putProfile: ", result);
  })
  .catch((err) => {
    console.error(`putProfile error: ${err}`);
  });

