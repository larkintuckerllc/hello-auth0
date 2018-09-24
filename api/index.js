const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();
const port = 8080;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://YOUR_AUTH0_DOMAIN/.well-known/jwks.json`,
  }),
  audience: '{YOUR_API_IDENTIFIER}',
  issuer: 'https://YOUR_AUTH0_DOMAIN/',
  algorithms: [ 'RS256' ],
});

app.use(cors());

app.get('/', checkJwt, (req, res) => res.send({ hello: 'world' }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
