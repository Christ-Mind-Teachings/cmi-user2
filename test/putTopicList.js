const user = require("../module/user");
const userId = "05399539cca9ac38db6db36f5c770ff1";
const sourceId = "10";

user.initialize(true, "remote");

let topicList = [
  { topic: 'Belief', value: 'Belief' },
  { topic: 'Body', value: 'Body' },
  { topic: 'Boredom', value: 'Boredom' },
  { topic: 'Brother', value: 'Brother' },
  { topic: 'Cause', value: 'Cause' },
  { topic: 'Choice', value: 'Choice' },
  { topic: 'Christ', value: 'Christ' },
  { topic: 'Christ Mind', value: 'ChristMind' },
];

user.putTopicList(userId, sourceId, topicList)
  .then((result) => {
    console.log("putTopicList: %s", result);
  })
  .catch((err) => {
    console.error(`putTopicList error: ${err}`);
  });




