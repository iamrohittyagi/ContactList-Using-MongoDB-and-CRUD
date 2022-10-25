//require the library
const mongoose = require('mongoose')

// connect to the database
mongoose.connect('mongodb://localhost:27017/contacts_list_db');


// aquire the connection to check it is successful
const db = mongoose.connection;

// error
db.on('error',console.error.bind(console,'error connecting to db'))

// up and running then print the message
db.once('open',function(){
    console.log('Successfully connected to database')
})