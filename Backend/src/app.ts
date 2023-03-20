import express from 'express';
import bodyParser from 'body-parser';
//import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(bodyParser.json());

//app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


export default app;
