const app = require('./app');
const Anime = require('./controllers/controls')

const PORT = 3050;

app.listen(PORT, () => {
    console.log('Server escuchando por puerto ', PORT);
});

app.get(["/", "/home"], (req, res) => {
    console.log('hoola')
    res.render('home');
});
app.get("/about", (req, res) => {
    res.render('about');
});
app.get("/animes", (req, res) => {
    let raw = new Anime
    let final = raw.findAll()
    //console.log(final)
    res.render('allAnimes', {
        target: [{
            nombre: final.nombre,
            genero: final.genero,
            anio: final['año'],
            autor: final.autor
        }]
    });
});
app.get("/animes/:id", (req, res) => {
    let id = req.params.id
    let raw = new Anime
    let final = raw.findById(id)
    res.render('anime', {
        target: [{
            id: id,
            nombre: [final.nombre],
            genero: [final.genero],
            anio: [final['año']],
            autor: [final.autor]
        }]
    });
});
app.post('/crear', (req, res)=>{
    
})

module.exports = app