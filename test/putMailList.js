const user = require("../module/user");
const userId = "05399539cca9ac38db6db36f5c770ff1";

user.initialize(true, "remote");

let emailList = [
  { last: 'Mercer', first: 'Rick', address: 'rmercer33@gmail.com' },
  { last: 'Macnamara',
    first: 'Kate',
    address: 'kate@jesmry.com.au' },
  { last: 'Danner',
    first: 'Jeff',
    address: 'jeffdanner@gmail.com' },
  { last: 'Lawrence',
    first: 'Patricia',
    address: '12patriciamaria@gmail.com' },
  { last: 'Schock', first: 'Dave', address: 'dwschock@gmail.com' },
  { last: 'Sattler',
    first: 'Franz',
    address: 'fsattler@comcast.net' },
  { last: 'Whitfield',
    first: 'George',
    address: 'anaxsas11@gmail.com' },
  { last: 'Osipov',
    first: 'Igor',
    address: 'ancientrussian@gmail.com' },
  { last: 'Nielsen',
    first: 'Irene',
    address: 'ainielsen@hotmail.com' },
  { last: 'Roble',
    first: 'Jeff',
    address: 'rockenroble@hotmail.com' },
  { last: 'Durnin',
    first: 'Jim',
    address: 'jdurnin@ix.netcom.com' },
  { last: 'Franklin',
    first: 'Julie',
    address: 'julief8@yahoo.com' },
  { last: 'Perron',
    first: 'Mari',
    address: 'perron.mari@gmail.com' },
  { last: 'Dubeau',
    first: 'Michel',
    address: 'keeptnpinmind@gmail.com' },
  { last: 'Gutiérrez',
    first: 'Moy',
    address: 'moygutierrez@gmail.com' },
  { last: 'Lightening',
    first: 'Orie',
    address: 'orie.lightning@gmail.com' },
  { last: 'Zimman',
    first: 'Rebecca',
    address: 'beczimman@comcast.net' },
  { last: 'Almelid',
    first: 'Steinar',
    address: 'sa@sanataconsulting.com' },
  { last: 'Thacker',
    first: 'Wendy',
    address: 'wendyethacker@gmail.com' },
  { last: 'Konieczniak',
    first: 'Marek',
    address: 'marek.konieczniak@pokojchrystusa.pl'
  }
];

user.putMailList(userId, emailList)
  .then((result) => {
    console.log("putMailList: %s", result);
  })
  .catch((err) => {
    console.error(`putMailList error: ${err}`);
  });




