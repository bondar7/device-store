const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const cors = require('cors');

sequelize.sync();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        await sequelize.authenticate(); // connect to database
        await sequelize.sync(); // compares db state with data schema
        app.listen(PORT, () => console.log("Server is running on port ", PORT ));
    } catch (e) {
        console.log(e);
    }
}

start();