
const fs = require('fs');
const { v4: uuid } = require('uuid');
const { leerArchivo } = require('./utils');

class Anime {
    constructor(nombre, genero, año, autor) {
        this.nombre = nombre;
        this.genero = genero;
        this.año = año;
        this.autor = autor;
    }
    
    async findAll() {
        let data = await leerArchivo('anime.json')
        let base = [];
        let objetos = await Object.entries(data).map((manga, index) => {
            let objeto = manga[1]
            objeto.id = manga[0]
            base.push(objeto)
        })
        return base
  
    }

    async findById(id) {
        let animes = await this.findAll()
        if(id.length < 3){
            let result = animes.find(anime => anime.id == id)
            console.log(result)
            return result
        } else {
            console.log(id.length)
            let result = animes.find(anime => anime.genero == id)
            console.log(result)
            return result
        }
    }
    async create(){
        let results = await this.findAll()
        let newAnime = {
            id: uuid().slice(0,2),
            nombre: this.nombre,
            genero: this.genero,
            año: this.año,
            autor: this.autor
        }
        results.push(newAnime)
        fs.writeFileSync('./db/anime.json', JSON.stringify(results))
        return newAnime
    }
    async delete(id){
        let todos = await this.findAll()
        todos = todos.filter(anime => anime.id != id);
        fs.writeFileSync('anime.json', JSON.stringify(todos));
        return todos
    }
}

module.exports = Anime