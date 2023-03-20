import * as sql from 'mssql';
import dotenv from 'dotenv'
import path from 'path';

// dotenv.config(
//   { path: path.resolve(__dirname, '/.env') }
// );
// ../../.env


const config = {
  server : 'DESKTOP-65FEA44', 
  database: 'stackoverflow',
  user: 'sa',
  password: '?/12345',
  pool: {
    max: 10, // maximum number of connections
    min: 0, // minimum number of connections
    idleTimeoutMillis: 30000 // how long a connection is allowed to remain idle before being closed
  },
  options: {
   encrypt: false // Use this option if your SQL Server is hosted on Azure
 }
};

// const config = {
//   server : process.env.DB_SERVER as string, 
//   database: process.env.DB_DATABASE as string,
//   user: process.env.DB_USER as string,
//   password: process.env.DB_PASSWORD as string,
//   options: {
//    encrypt: false // Use this option if your SQL Server is hosted on Azure
//  }
// };
export const pool = new sql.ConnectionPool(config)

pool.connect()
  .then(() => {
    console.log('Connected to MSSQL Server');
  })
  .catch((err) => {
    console.error(err);
  });


  export const executeQuery = async (procedureName: string, parameters: any[] = []): Promise<sql.IResult<any>> => {
    try {
      const pool = await sql.connect(config);
      const request = await pool.request();
      parameters.forEach((p, i) => {
        request.input(`p${i + 1}`, p);
      });
      return await request.execute(procedureName);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      sql.close();
    }
  };
