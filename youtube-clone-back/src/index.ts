import express from 'express'
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import authconfig from './auth0-config.secret.json';

const app = express()
const port = 8000

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow CORS, React App URL
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'authorization');
  next();
});

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: authconfig.audience,
  issuerBaseURL: `https://${authconfig.domain}`,
});

app.head('/api', (req, res) => {
  res.sendStatus(200);
})

// 인증이 필요 없는 route
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// 인증이 필요한 route
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

const checkScopes = requiredScopes('read:messages');
app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

app.listen(port, () => {
  console.log(`Server open at ${port}`)
})