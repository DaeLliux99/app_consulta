const express = require('express');
const mysql = require('mysql2');
const { database } = require('./keys');
const path = require('path');
const { create } = require('express-handlebars'); 

const connection = mysql.createConnection(database)

const app = express();

app.set('port', process.env.PORT || 4000);


app.use(express.urlencoded({extended: false}));
app.use(express.json())


app.set('views', path.join(__dirname, 'views'));

const hbs = create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
})

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.get("/", (req, res) => {
    connection.query('SELECT * FROM Usuario', (error, results) => {
        if (error) {
            console.error(error.stack);
            return;
        }
        res.render('home', { results });
    });
})

app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
});