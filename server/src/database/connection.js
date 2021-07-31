const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    dbName: process.env.MONGODB_DATABASE_NAME,
    user: process.env.MONGODB_USERNAME,
    pass: process.env.MONGODB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
mongoose.connection.on('error', function () { console.log('error database') })
mongoose.connection.once('open', function () { console.log('connected to database') });
module.exports = mongoose.connection;