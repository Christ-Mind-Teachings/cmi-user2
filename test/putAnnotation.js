const db = require("../module/user");

const annotation = {
  Comment: 'Jeshua comes not to teach but to love.',
  quote: true,
  rangeStart: 'p2',
  selectedText: '{"type":"Annotation","title":"Way of the Heart: Lesson One","url":"/t/wom/woh/l01/","pid":"p2","id":"939787a9-c806-48c2-8bdd-2a4c8ed0ac4b","target":{"type":"SpecificResource","source":"https://www.christmind.info/t/wom/woh/l01/?bkmk=p10#","selector":[{"start":32,"end":110,"type":"TextPositionSelector"},{"exact":" I come not for myself, but for you. I come\\nnot to teach you, but to love you,","prefix":"(p2) Therefore, beloved friends,","suffix":" until you choose, from the dept","type":"TextQuoteSelector"}]},"aid":"1574135941795"}',
  aid: '939787a9-c806-48c2-8bdd-2a4c8ed0ac4b',
  rangeEnd: 'p2',
  topicList: [ { count: 1, topic: 'Jeshua', value: 'Jeshua' } ] 
};

const  userId = 'xx05399539cca9ac38db6db36f5c770ff1';
const  paraKey =  '10401000.003';
const  creationDate = '1574135941795';

/*
const userId = "05399539cca9ac38db6db36f5c770ff1";
const parakey = "10401000.055";
const creationDate = "1582683264281";
const annotation = {
  bookTitle: "The Way of the Heart",
  Comment: "This is a quote from the Way of the Heart",
  rangeStart: "p16",
  rangeEnd: "p16",
  topicList: [
    {
      "value": "Love",
      "topic": "Love"
    },
    {
      "value": "TruthThatIsTrueAlways",
      "topic": "Truth That Is True Always"
    }
  ]
};
*/

db.initialize(true, "remote");

db.putAnnotation(userId, paraKey, creationDate, annotation)
  .then((result) => {
    console.log("putAnnotation: ", result);
  })
  .catch((err) => {
    console.error(`putAnnotation error: ${err}`);
  });

