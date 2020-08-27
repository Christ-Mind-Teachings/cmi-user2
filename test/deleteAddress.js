const user = require("../module/user");
const userId = "05399539cca9ac38db6db36f5c770ff1";

user.initialize(true, "remote");

user.deleteAddress(userId, "rockenroble@hotmail.com")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.error(`deleteAddress error: ${err}`);
  });

