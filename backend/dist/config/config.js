"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    DB: {
        URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/ecostore',
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    },
    DBMYSQL: {
        host: 'localhost:3307',
        user: 'root',
        password: 'admin',
        database: ''
    }
};
