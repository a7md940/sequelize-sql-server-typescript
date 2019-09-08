type DatabaseTypes =
  | 'mssql'
  | 'mysql'
  | 'postgres'
  | 'sqlite'
  | 'mariadb'
  | undefined;

export default {
  db: {
    username: (process.env.DB_USERNAME || 'radwantest') as string,
    password: (process.env.DB_PASSWORD || 'd95844') as string,
    name: (process.env.DB_NAME || 'SequelizeDemo') as string,
    host: (process.env.DB_HOST || 'localhost') as string,
    type: (process.env.DB_TYPE || 'mssql') as DatabaseTypes
  },
  port: process.env.PORT || 3000
};
