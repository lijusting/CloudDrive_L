const express = require('express');
const app = express();

const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:8080',
    optionSuccessStatus: 200
};
app.use(cors(corsOptions));

const morgan = require('morgan');
app.use(morgan('combined'));

const md5 = require('md5');

const multer = require('multer');
const storage = multer.diskStorage({
    destination(req, res, cb) {
        cb(null, './resource');
    },
    filename(req, file, cb) {
        file.originalname = Buffer.from(file.originalname, "latin1").toString(
            "utf8"
        );
        const fileNameArr = file.originalname.split('.');
        const fileName = `${md5(fileNameArr[0])}.${fileNameArr[1]}`;
        cb(null, fileName);
    }
});
app.use(multer({ storage }).any());


require('../route/file')(app);
require('../route/use')(app);

//  创建服务器
let server = app.listen(process.env.PORT || 8081, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log('服务器启动: http://%s:%s', host, port);
});
