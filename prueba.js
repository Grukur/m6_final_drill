let objeto = {
    "1": {
        "nombre": "Akira",
        "genero": "Seinen",
        "año": "1988",
        "autor": "Katsuhiro Otomo"
    },
    "2": {
        "nombre": "Dragon Ball",
        "genero": "Shonen",
        "año": "1986",
        "autor": "Akira Toriyama"
    },
    "3": {
        "nombre": "Sailor Moon",
        "genero": "Shojo",
        "año": "1992",
        "autor": "Naoko Takeuchi"
    },
    "4": {
        "nombre": "Naruto",
        "genero": "Shonen",
        "año": "2002",
        "autor": "Masashi Kishimoto"
    },
    "5": {
        "nombre": "Neon Genesis Evangelion",
        "genero": "Mecha",
        "año": "1995",
        "autor": "Yoshiyuki Sadamoto"
    }
}

let objetos = Object.entries(objeto).map((manga, index) => {
     let objeto = manga[1]
     objeto.id = manga[0]
     return objeto
})

console.log(objetos)