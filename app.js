const express = require('express');
const app = express();
const mongoose = require('mongoose');
const accessControl = require('./middlewares/accessControl.js');
const { devDB, liveDB } = require('./config.json');

app.use(accessControl);
app.use(express.json({ limit: '64mb' }));


// routers




// connection Mongoose

const dbUrl = devDB;
mongoose
    .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        () =>
            console.log(
                '\x1b[32m',
                `[mongoose] db connected on ${dbUrl} ...`,
                '\x1b[37m',
            ),
        mongoose.set('useFindAndModify', false),
    )
    .catch((err) =>
        console.log(
            '\x1b[31m',
            '[mongoose] db connection error :',
            err,
            '\x1b[37m',
        ),
    )

const PORT = process.env.PORT || 2424;
app.listen(PORT, () => {
    console.log(
        '\x1b[33m',
        `[app] server running on port ${PORT} ...`,
        '\x1b[37m',
    )
})