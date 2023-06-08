const app = require('./app');
const Anime = require('./controllers/controls')

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Server escuchando por puerto ', PORT);
});

//RUTAS VISTAS
//Inicio
app.get(["/", "/home"], (req, res) => {
    console.log('hoola')
    res.render('home');
});
//Acerca
app.get("/about", (req, res) => {
    res.render('about');
});

//Muestra todos los animes
app.get("/animes", async (req, res) => {
    try {

        let raw = new Anime
        let final = await raw.findAll()
        res.render('allAnimes', {
            target: final
        });
    } catch (error) {
        res.render('allAnimes', {
            error,
        })
    }
});

//Muestra anime por ID
app.get("/animes/:id", async (req, res) => {
    try {
        let id = req.params.id
        let raw = new Anime
        let final = await raw.findById(id)
        console.log(final)
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
app.post('/animesCrear', async (req, res) => {
    try {
        let {nombre, genero, año, autor} = req.body;
        console.log(nombre, genero, año, autor)
        let newAnime = new Anime(nombre, genero, año, autor);
        let respuesta = await newAnime.create();
        res.status(201).send({
            code: 201,
            message: respuesta
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            code: 500,
            message: 'error al guardar el anime.'
        })
    }
})
//Actualiza anime
app.put('/animes', (req, res) => {

})
//Elimina anime
app.delete('/animes', (req, res) => {

})
