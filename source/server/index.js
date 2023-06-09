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
app.post('/animes', async (req, res) => {
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
//Elimina anime
app.delete('/animes/:id', async (req, res) => {
    try{
        let {id} = req.params;
        let trash = new Anime;
        trash.delete(id);
    } catch (error){
        console.log(error)
    }
})

//Actualiza anime
app.put('/animes', async (req, res) => {
    try{
        let {id, nombre, genero, año, autor} = req.body;
        let newUser = new Anime(nombre, genero, año, autor);
        let respuesta = await newUser.update(id);
        console.log(respuesta)
        if(respuesta){
            res.status(200).send({ code:200, message:'whohu! Exito!'})
        }else{
            res.status(500).send({
                code:500,
                message:'Algo salió muy mal..... :O'
            })
        }
    }catch(error){
        console.log(error)
    }
})

