
const fs = require('fs');
const { v4: uuid } = require('uuid');

class Anime {
    constructor(id, nombre, genero, anio, autor) {
        this.id = id;
        this.nombre = nombre;
        this.genero = genero;
        this.anio = anio;
        this.autor = autor;
    }
    findAll() {
        let result = [];
        let resultadoJson = fs.readFileSync('./bbdd/anime.json', 'utf8')
        let resultado = JSON.parse(resultadoJson)
        for (let i in resultado) {
                result.push(resultado[i])           
        }
        return result
    }

    findById(id) {
        let anime = this.findAll()
        return (anime[id])
    }
    create(){
        let newAnime = {
            id: uuid().slice(0,4),
            nombre: this.nombre,
            genero: this.genero,
            anio: this.anio,
            autor: this.autor
        }
        let results = this.findAll()
        results.push(newAnime)
        fs.writeFileSync('./bbdd/anime.json', JSON.stringify(results))
        return newAnime
    }
}

module.exports = Anime