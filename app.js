const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var router = express.Router();


router.get('/test', function (req, res) {
    res.json({message : 'good'})
});

app.get('/', function (req, res) {
    res.json({message : 'Please use /api routes'})
});
app.use('/api', router);

app.listen(port, function () {
    console.log('app listening on port ' + port);
});

