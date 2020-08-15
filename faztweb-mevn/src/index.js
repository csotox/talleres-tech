const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Utilizo docker con el puerto 27017
// Mongo v4.4
mongoose.connect('mongodb://localhost:27017/menv-fazt')
    .then(db => console.log('DB is connected'))
    .catch(error => console.error(error));

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/tasks', require('./routes/tasks.js'));

// Static file
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});