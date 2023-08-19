const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 8000;
require('express-async-errors');
const morgan = require('morgan');
const connectDB = require('./db/mongoose');
const errorHandlerMiddleware = require('./middleware/error_handler');
const notFound = require('./middleware/not_found');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());





app.get('/', (req, res) => {
    return res.send("Hello World");
})


//middleware
app.use(errorHandlerMiddleware);
app.use(notFound);


const start = async() => {
    try{
   await connectDB(process.env.MONGO_URI);
   app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
   })
} catch(err) {
    console.log(err);
}
}

start();

