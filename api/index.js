const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');

const app = express();
const port = 3000;
const cors = require('cors');
const { url } = require('inspector');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Todo-admin:IeDN6i4ESx60w9oJ@cluster0.m8e9ata.mongodb.net/').then( () => {
    console.log('Connected to MongoDB');
}).catch( (err) => {
    console.log('Error connecting to MongoDB', err);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



///// mongodb+srv://<username>:<password>@cluster0.m8e9ata.mongodb.net/

/// mongoose connecting username Todo-Admin password IeDN6i4ESx60w9oJ