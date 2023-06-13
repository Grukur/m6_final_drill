const app = require('./app');
const Anime = require('./controllers/controls')

const PORT = 3000;

let server = app.listen(PORT, () => {
    console.log('Server escuchando por puerto ', PORT);
});

//RUTAS VISTAS
//Inicio
app.get(["/", "/home"], (req, res) => {
    res.render('home');
});
//Acerca
app.get("/about", (req, res) => {
    res.render('about');
});
//para todas las rutas que no existen y cualquier metodo

//Muestra todos los animes
app.get("/animes", async (req, res) => {
    try {

        let raw = new Anime
        let final = await raw.findAll()
        res.status(200).render('allAnimes', {
            target: final
        });
    } catch (error) {
        res.render('allAnimes', {
            error,
        })
    }
});

//Muestra anime por ID
app.get("/anime/:id", async (req, res) => {
    try {
        let id = req.params.id
        let raw = new Anime
        let final = await raw.findById(id)
        res.render('anime', {
            target: [final]
        });
    } catch (error) {
        res.render('anime', {
            error,
        })
    }
});

//RUTAS ENDPOINT
//Crea anime
app.post('/animes', async (req, res) => {
    try {
        let { nombre, genero, año, autor } = req.body;
        console.log(nombre, genero, año, autor)
        let newAnime = new Anime(nombre, genero, año, autor);
        let respuesta = await newAnime.create();
        res.status(201).send({
            code: 201,
            message: respuesta
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 500,
            message: 'error al guardar el anime.'
        })
    }
})
//Elimina anime
app.delete('/animes/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let trash = new Anime;
        await trash.delete(id);
        res.status(200).send({
            message: 'Usuario eleminado',
            code: 200
        })
    } catch (error) {
        res.status(500).send({
            message: error,
            code: 500
        })
    }
})

//Actualiza anime
app.put('/animes', async (req, res) => {
    try {
        let { id, nombre, genero, año, autor } = req.body;
        let newUser = new Anime(nombre, genero, año, autor);
        let respuesta = await newUser.update(id);
        console.log(respuesta)
        if (respuesta) {
            res.status(200).send({ code: 200, message: 'whohu! Exito!' })
        } else {
            res.status(500).send({
                code: 500,
                message: 'Algo salió muy mal..... :O'
            })
        }
    } catch (error) {
        console.log(error)
    }
})
app.all("*", (req, res) => {
    res.status(200).send(`Ruta ${req.method} no encontrada.`);
});

module.exports = server;