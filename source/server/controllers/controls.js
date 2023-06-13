
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
        if (data){          
            return data
        } else {
            console.log('La base de datos está vacia')
        }  
    }

    async findById(id) {
        let animes = await this.findAll()
        let animeName = animes.find(anime => anime.nombre.toLowerCase() == id.toLowerCase())
        console.log(animeName)
        let animeId = animes.find(anime => anime.id== id)
        if(animeName){
            return animeName
        } else if (animeId) {
            return animeId
        } else {
            return false
        }
    }
    async create(){
        let results = await this.findAll()
        let id = uuid().slice(0,6);
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
    async update(id){
        let identificador = id || this.id;
        let todos = await this.findAll()
        let newAnime = todos.find(anime => anime.id == identificador);

        if ( newAnime ) {
            newAnime.nombre = this.nombre;
            newAnime.genero = this.genero;
            newAnime.año = this.año;
            newAnime.autor = this.autor;
            await escribirArchivo('anime.json', todos);
            return newAnime;
        } else {
            return false
        }
    }
}

module.exports = Anime