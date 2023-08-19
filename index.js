const express = require('express');
require('dotenv').config();
const port = 8000;
require('express-async-errors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/mongoose');
const errorHandlerMiddleware = require('./middleware/error_handler');
const notFound = require('./middleware/not_found');

const app = express();
// middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));



app.get('/', (req, res) => {
    return res.send('E-commerce-api');
})


app.get('/api/v1', (req, res) => {
    console.log(req.signedCookies);
    return res.send('Cookie');
})

// routers
app.use('/', require('./routes'));

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

