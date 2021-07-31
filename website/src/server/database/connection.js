// const mongoose = require('mongoose');
import * as mongoose from 'mongoose';

mongoose.connect("mongodb+srv://main.xnesz.mongodb.net/", {
    dbName: '3d-personal-steel',
    user: 'admin-2301',
    pass: '_admin-2301_',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
// mongoose.connection.on('error', function () { console.log('error database') })
// mongoose.connection.once('open', function () { console.log('connected to database') });
module.exports = mongoose.connection;