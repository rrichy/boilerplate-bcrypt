'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const bcrypt = require('bcrypt');
const helmet = require('helmet');

const app         = express();
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

app.use(helmet({
  frameguard: {
    action: 'deny'
  }, 
  hsts: {
    maxAge: 90 * 24 * 3600,
    force: true
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"]
    }
  }
}));

//START_ASYNC -do not remove notes, place code between correct pair of notes.
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  console.log(hash);

  bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
    console.log(res);
  });
});

//END_ASYNC

//START_SYNC
var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash);
var result = bcrypt.compareSync(myPlaintextPassword, hash);
console.log(result);

//END_SYNC






























app.listen(process.env.PORT || 3000, () => {});
