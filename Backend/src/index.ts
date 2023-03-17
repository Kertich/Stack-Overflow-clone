import * as sql from 'mssql';
import dotenv from 'dotenv'
import path from 'path';

dotenv.config(
  { path: path.resolve(__dirname, '../../.env') }
);


const config = {
  server : process.env.DB_SERVER as string, 
  database: process.env.DB_DATABASE as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  options: {
   encrypt: false // Use this option if your SQL Server is hosted on Azure
 }
};

sql.connect(config)
  .then(() => {
    console.log('Connected to MSSQL Server');
  })
  .catch((err) => {
    console.error(err);
  });
