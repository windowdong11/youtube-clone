import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';
import path from 'path';
import videoRouter from './route/video';
import commentRouter from './route/comment';
import userRouter from './route/user';
import utility from './utils';

if(process.env.NODE_ENV === undefined) {
  console.log('\x1b[33m%s\x1b[0m', '\n환경변수 NODE_ENV를 설정하지 않았습니다.\nNODE_ENV 환경변수를 설정해주세요. [production, development](default : development)\nex) NODE_ENV=production npm start\n')
}
const env = utility.getNODE_ENV();
const directories = {
  production: path.join(__dirname, '../.env.production'),
  development: path.join(__dirname, '../.env.development'),
};
if (env === 'production') {
  dotenv.config({ path: directories.production })
} else if (env === 'development') {
  dotenv.config({ path: directories.development })
}

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', [process.env.CLIENT]); // Allow CORS, React App URL
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

app.get('/api', (req, res) => {
  res.sendStatus(200);
});
app.use('/api/video', videoRouter);
app.use('/api/comment', commentRouter);
app.use('/api/user', userRouter);

const httpsOptions = {
  private_key: process.env.SSL_PRIVATE_KEY,
  cert_chain: process.env.SSL_CERT_CHAIN
}
function readHttpsOptionFiles(https_options: { private_key: string, cert_chain: string }) {
  const { private_key, cert_chain } = https_options;
  return {
    key: fs.readFileSync(private_key),
    cert: fs.readFileSync(cert_chain),
  };
}

if (utility.checkFsExistsInEachProperties(httpsOptions)) {
  https.createServer(readHttpsOptionFiles(httpsOptions), app).listen(process.env.PORT, () => {
    console.log(`Https server running at ${process.env.PORT}`);
  })
} else {
  http.createServer(app).listen(process.env.PORT, () => {
    console.log(`Http server running at ${process.env.PORT}`);
  })
}

export default app;
export { checkJwt };


// # 예시코드

// 인증이 필요 없는 route
// app.get('/api/public', function(req, res) {
//   res.json({
//     message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
//   });
// });

// 인증이 필요한 route
// app.get('/api/private', checkJwt, function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated to see this.'
//   });
// });

// const checkScopes = requiredScopes('read:messages');
// app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
//   });
// });