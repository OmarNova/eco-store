export default {
    DB: {
      URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecostore',
      USER: process.env.MONGODB_USER,
      PASSWORD: process.env.MONGODB_PASSWORD
    },

    DBMYSQL: {
      host: 'localhost',
      user: 'root',
      password: 'admin',
      database: 'ecostore',
      port: '3307'
    },

    jwt: {
      key: 'secretkey_ecostore'
    }

  };