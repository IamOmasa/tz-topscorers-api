console.log('Its Soccer time!');
const express = require('express');
//create express app using function express()
const app = express();

//database for top scorers
let topscorers = [
    {
        name: 'mussa mgosi',
        team: 'Simba SC',
        score: '18',
        id: '2010',

    }
]

//define routes to the application using event handler handling HTTP request 
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})
//handle HTTP get reequest made to topScorers
app.get('/api/topscorers/:id', (request, response) => {
    const id = request.params.id
    console.log(id);
    const topscorer = topscorers.find(topscorer => topscorer.id === id)
    if (topscorer) {
        response.json(topscorer)
    } else {
        response.status(404).end()
    }
})
//Deleting resource
app.delete('/api/topscorers/:id', (request, response) => {
    const id = Number(request.params.id)
    topscorers = topscorers.filter(topscorer => topscorer.id !== id)

    response.status(204).end()
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

//install nodemon to run server automatically npm install --save-dev nodemon
