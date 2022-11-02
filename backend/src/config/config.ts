export default {
    DB: {
      URI: process.env.MONGODB_URI || 'mongodb+srv://OmarNova:2G3ItBCbNelDh2MH@ecostore.21wsizh.mongodb.net/ecostore',  //'mongodb://localhost:27017/ecostore',
      USER: process.env.MONGODB_USER,
      PASSWORD: process.env.MONGODB_PASSWORD
    },

    DBMYSQL: {
      host: 'localhost',
      user: 'root',
      password: 'admin',
      database: 'ecostore',
      port: '3307'
    }

  };