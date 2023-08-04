import { createConnection } from 'mysql2/promise';

const connection = createConnection({
  host: 'localhost',
  user: 'root',
  password: '0001',
  database: 'bdweb'
});

export default connection;
