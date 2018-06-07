const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const port = process.env.PORT || 5000;

//setup router
const songRouter = require('./routes/song.router');
app.use('/song', songRouter);

app.listen(port, () => {
    console.log('Server is listening on', port); 
});