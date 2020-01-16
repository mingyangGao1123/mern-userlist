const express = require('express');
const connectDB = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
//connect Database
connectDB();


app.use(express.json({extended: false}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res)=>res.send('API Running'));

//Define Routes
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 3003;
app.listen(PORT,()=>console.log('Server Start on Port!'));