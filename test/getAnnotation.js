const user = require("../module/user");
const util = require("util");

/*
const userId = "05399539cca9ac38db6db36f5c770ff1";
const parakey = "10401000.055";
const creationDate = "1582683264281";
*/

const  userId = 'xx05399539cca9ac38db6db36f5c770ff1';
const  paraKey =  '10401000.003';
const  creationDate = '1574135941795';

user.initialize(true, "remote");

user.getAnnotation(userId, paraKey, creationDate)
  .then((quote) => {
    console.log("getAnnotation: %s", util.inspect(quote, {depth: 6}));
  })
  .catch((err) => {
    console.error(`getAnnotation error: ${err}`);
  });

