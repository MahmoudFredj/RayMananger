const express = require('express');
const app = express();
const accessControl = require('./middlewares/accessControl.js');
const { devDB, liveDB } = require('./config.json');
const DbAccess = require('./Module/DataAccessLayer/dbAccess.js');
app.use(accessControl);
app.use(express.json({ limit: '64mb' }));


// routers




// connection Mongoose

const dbUrl = devDB;
DbAccess.connect(devDB);

const dba = new DbAccess();
dba.offlineOperation("select * from project").then((msg) => {
    console.log(msg);
}).catch(
    (err) => {
        console.log(err);
    }
)

const PORT = process.env.PORT || 2424;
app.listen(PORT, () => {
    console.log(
        '\x1b[33m',
        `[app] server running on port ${PORT} ...`,
        '\x1b[37m',
    )
})