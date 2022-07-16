import express from 'express';
import https from 'https';
import fs from 'fs';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '../.env.production') })
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.join(__dirname, '../.env.development') })
} else {
  dotenv.config({ path: path.join(__dirname, '../.env.development') })
  // 노란색으로 출력
  console.log('\x1b[33m%s\x1b[0m', '\n환경변수 NODE_ENV를 설정하지 않았습니다.\nNODE_ENV 환경변수를 설정해주세요. [production, development](default : development)\nex) NODE_ENV=production npm start\n')
}

const clients = [
  process.env.CLIENT
]
const port = {
  https: 8443,
}

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT); // Allow CORS, React App URL
  res.setHeader('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'DELETE']);
  res.setHeader('Access-Control-Allow-Headers', 'authorization');
  next();
});

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
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

const httpsOptions : https.ServerOptions = {
  key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
  cert: fs.readFileSync(process.env.SSL_CERT_CHAIN),
};

https.createServer(httpsOptions,app).listen(port.https, () => {
  console.log(`Https server running at ${port.https}`)
})