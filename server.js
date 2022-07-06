console.log('Its Soccer time!');
const express = require('express');
//create express app using function express()
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
app.use(cors());
//to read data from the forminstall body-parser
app.use(bodyParser.urlencoded({ extended: true }));

//database for top scorers
let topscorers = [
    {
        name: 'mussa mgosi',
        team: 'Simba SC',
        score: '18',
        year: '2010',

    }
]


//define routes to the application using event handler handling HTTP request 
app.get('/', (request, response) => {

    response.sendFile(__dirname + '/index.html')
})
app.post('/topscorers', (request, response) => {
    console.log(request.body)
})
//handle HTTP get reequest made to topScorers
app.get('/api/topscorers/:year', (request, response) => {
    const year = request.params.year
    console.log(year);
    const topscorer = topscorers.find(topscorer => topscorer.year === year)
    if (topscorer) {
        response.json(topscorer)
    } else {
        response.status(404).end()
    }
})
//Deleting resource
app.delete('/api/topscorers/:year', (request, response) => {
    const year = Number(request.params.year)
    topscorers = topscorers.filter(topscorer => topscorer.year !== year)

    response.status(204).end()
})

const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

//install nodemon to run server automatically npm install --save-dev nodemon
