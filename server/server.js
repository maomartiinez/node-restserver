require('./config/config'); //variable global
const express = require('express');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(require('./routes/usuario')); //importamos y usamos las rutas de usuario


mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, resp) => {
    if (err) throw new Error(err);
    console.log('Base de Datos Online');
}); //conexion con la base de datos

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto ", process.env.PORT);
});