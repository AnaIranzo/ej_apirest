require('dotenv').config()
const express = require ('express')
const fetch = require('node-fetch')

const getFilm = require('./utils/get_film')

const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());
const API_KEY = process.env.API_KEY


app.get('/', (req, res) => { //request, response
    res.send('Hello World!')
})

//http://localhost:3000/api/film/batman
app.get('/api/film/:title?', async (req, res)=> {
    try {
        /* let response = await fetch(`http://www.omdbapi.com/?t=${req.params.title}&apikey=${API_KEY}`); //{}
        let film = await response.json(); //{}
        res.status(200).json(film); // respuesta de la api  */
        //Pasamos a una funcion externa
        const {title} = req.params;
        getFilm(title, res);
        
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
    }
});

app.post('/api/film', async (req,res)=>{
    //Simulacion con thunder client
    const newFilm = req.body;
    res.status(200).json({msj: `Pelicula ${newFilm.Title} añadida a la base de datos`})
    
    //Para hacer el post a la API
    /*  let response = await fetch (`http://www.omdbapi.com/?apikey=${API_KEY}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFilm)
    })
    let answer = await response.json();
    console.log(answer);

    res.status(200).json({msj:`Pelicula ${answer.title} guardado en el sistema con ID: ${answer.id}`}) */

})

app.put('/api/film', async (req,res)=>{
    const newFilm = req.body;
    res.status(200).json({msj: `Pelicula ${newFilm.Title} modificada en la base de datos`})
})
// DELETE 
app.delete('/api/film', async (req,res)=> {
    const newFilm = req.body;
    res.status(200).json({msj: `Pelicula ${newFilm.Title} borrada de la base de datos`})
})

//ERRORES
// 404
app.use(function(req, res, next) {
    return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
});

  // 500 - Any server error
app.use(function(err, req, res, next) {
    return res.status(500).send({ error: err });
});







app.listen(3000, ()=>{
    console.log('Port 3000');
})
