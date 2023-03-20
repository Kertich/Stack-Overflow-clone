import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import http from 'http';
import xss from 'xss-clean';
import cookieParser from 'cookie-parser';
import debug from 'debug';

import indexRouter from './src/routers/index';
import { normalizePort, onError } from './src/config/port';

const app: Application = express();

// compressing api response
app.use(compression());

// logger
app.use(morgan('dev'));

// Get port from environment and store in Express.
const PORT: number | string = normalizePort(process.env.PORT || '5000');
app.set('port', PORT);

// cors enable
app.use(cors());

// data sanitization against xss
app.use(xss());

// security config
app.use(helmet());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: connection with client setup
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
//
//   app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

// all the api routers
app.use('/api', indexRouter);

// index setup
const server: http.Server = http.createServer(app);

// Event listener for HTTP server 'listening' event.
const onListening = () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
  debug(`Server running on ${bind}, http://localhost:${address.port}`);
  console.log(`Server running on ${bind}, http://localhost:${address.port}`);
};

// Listen on provided port, on all network interfaces.
server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);
