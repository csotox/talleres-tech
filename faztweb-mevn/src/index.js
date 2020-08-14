const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares

// Routes

// Static file
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});