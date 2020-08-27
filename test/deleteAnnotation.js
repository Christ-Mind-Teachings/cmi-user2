const user = require("../module/user");

/*
const userId = "05399539cca9ac38db6db36f5c770ff1";
const paraKey = "10401000.055";
const creationDate = "1582683264281";
*/

const  userId = 'xx05399539cca9ac38db6db36f5c770ff1';
const  paraKey =  '10401000.003';
const  creationDate = '1574135941795';

user.initialize(true, "remote");

user.deleteAnnotation(userId, paraKey, creationDate)
  .then((response) => {
    console.log("deleteAnnotation: %s", response) 
  })
  .catch((err) => {
    console.error(`deleteAnnotation error: ${err}`);
  });

