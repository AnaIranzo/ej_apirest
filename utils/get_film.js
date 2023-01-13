
const fetch = require('node-fetch');
const API_KEY = process.env.API_KEY

async function getFilm(title) {
    let response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`); //{}
    let film = await response.json(); //{}
    return film 
}

module.exports = getFilm;