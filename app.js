const express = require('express');
const app = express();
const accessControl = require('./middlewares/accessControl.js');
const { devDB, liveDB } = require('./config.json');
const DbAccess = require('./Module/DataAccessLayer/dbAccess.js');
const QueryManager = require('./Module/DataAccessLayer/queryManager.js');
app.use(accessControl);
app.use(express.json({ limit: '64mb' }));


// routers




// setting database connection params
const dbUrl = devDB;
DbAccess.connect(devDB);
// testing



app.get('/', async (req, res) => {
    let qm = new QueryManager('project');
    try {
        const result = await qm.selectAll({ name: 'red', description: 'high' }, { id: 2 });
        res.send(result);
    } catch (e) {
        res.send(e)
    }

});



const PORT = process.env.PORT || 2424;
app.listen(PORT, () => {
    console.log(
        '\x1b[33m',
        `[app] server running on port ${PORT} ...`,
        '\x1b[37m',
    )
})