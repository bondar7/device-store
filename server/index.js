const express = require('express');
require('dotenv').config();
const sequelize = require('./db');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const fileUpload = require('express-fileupload');
const path = require('path');

sequelize.sync()
const app = express();

app.use(cors());
app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'static'))); //serve static files to browser
app.use('/api', router);

//must be after all routes
app.use(errorHandler);

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