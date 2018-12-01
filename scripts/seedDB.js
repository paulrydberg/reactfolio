const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const mongoKeys = require('../config/keys').mongoURI;

// const theJSON = require('./seedfile.json').data;
const theJSON = {};

mongoose.connect(
  mongoKeys,
  { useNewUrlParser: true, useCreateIndex: true }
);
// mongoose.createConnection(
//   process.env.MONGODB_URI || 'mongodb://localhost/cryptospy',
//   { useNewUrlParser: true }
// );

db.remove({})
  .then(() => db.collection.insertMany(theJSON))
  .then(data => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
