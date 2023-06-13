//cargamos express y cors
const express = require('express');
const cors = require('cors');
const { create } = require('express-handlebars');

//ejecutamos express
let app = express();

//creamos instancia handlebars
const hbs = create({
    partialsDir: ["views/partials/"],
});

//Configuramos handlebars como motor de plantilla para el rendirizado
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set("views", __dirname + "/views");


//middlewares
app.use(express.json());
app.use(cors());

//Publicamos carpeta dist de boostrap
app.use(
    "/bootstrap",
    express.static(__dirname + "/node_modules/bootstrap/dist/")
);

//publicamos carpeta public
app.use(express.static('public'));

//Exportamos modulo
module.exports = app