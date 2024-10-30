import mysql, { ConnectionOptions } from 'mysql2';

const access: ConnectionOptions = {
  user: 'root',
  database: 'real_time_comments',
  password: 'Mysql*123'
};

const conn = mysql.createConnection(access);
export default conn;

