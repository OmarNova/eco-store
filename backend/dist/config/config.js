"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/ecostore',
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
