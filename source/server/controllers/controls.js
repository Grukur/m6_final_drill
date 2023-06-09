
const fs = require('fs');
const { v4: uuid } = require('uuid');
const { leerArchivo, escribirArchivo } = require('./utils');

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
        let objetos = await Object.entries(data).map((manga, id) => {
            let objeto = manga[1]
            objeto.id = manga[0]
            console.log(manga)
            base.push(objeto)
        })
        return base
  
    }

    async findById(id) {
        let animes = await this.findAll()
        if(id.length < 3){
            let result = animes.find(anime => anime.id == id)
            return result
        } else {
            let result = animes.find(anime => anime.genero == id)
            return result
        }
    }
    async create(){
        let results = await this.findAll()
        let id = uuid().slice(0,2);
        let newAnime = {
            id: id,
            nombre: this.nombre,
            genero: this.genero,
            año: this.año,
            autor: this.autor
        }
        results.push(newAnime);
        await escribirArchivo('anime.json', results)
        return newAnime
    }
    async delete(id){
        let todos = await this.findAll()
        todos = todos.filter(anime => anime.id != id);
        escribirArchivo('anime.json', todos);
        return todos
    }
}

module.exports = Anime