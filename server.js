console.log('Its Soccer time!');

const express = require('express');
//create express app using function express()
const app = express();
const morgan = require('morgan')
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

app.use(express.json());
app.use(morgan('tiny'));

morgan.token('object', function (request, response) {
    return `${JSON.stringify(request.body)}`
})

app.use(morgan(' :object'))
app.use(cors());
dotenv.config();
//to read data from the forminstall body-parser
app.use(bodyParser.urlencoded({ extended: true }));

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.x3rcg.mongodb.net/?retryWrites=true&w=majority`

//database for top scorers
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('tz-topscorers')
        const topScorersCollection = db.collection(`topscorers`)
        let topscorers = [
            {
                name: 'mussa mgosi',
                team: 'Simba SC',
                score: '18',
                year: 2010,

            },

            {
                name: 'mrisho ngassa',
                team: 'Azam FC',
                score: '18',
                year: 2011,

            },

            {
                name: 'john bocco',
                team: 'Azam FC',
                score: '19',
                year: 2012,

            },

            {
                name: 'amisi tambwe',
                team: 'Simba SC',
                score: '19',
                year: 2013,

            },

            {
                name: 'kipre tchetche',
                team: 'Azam FC',
                score: '17',
                year: 2014,

            },
            {
                name: 'simon msuva',
                team: 'Yanga SC',
                score: '17',
                year: 2015,

            },

            {
                name: 'amisi tambwe',
                team: 'Yanga SC',
                score: '21',
                year: 2016,

            },

            {
                name: 'simon msuva',
                team: 'Yanga SC',
                score: '14',
                year: 2017,

            },
            {
                name: 'abrahman mussa',
                team: 'Ruvu Shooting',
                score: '14',
                year: 2017,

            },

            {
                name: 'emanuel okwi',
                team: 'Simba SC',
                score: '20',
                year: 2018,

            },

            {
                name: 'meddie kagere',
                team: 'Simba SC',
                score: '23',
                year: 2019,

            },

            {
                name: 'meddie kagere',
                team: 'Simba SC',
                score: '22',
                year: '2020',

            },

            {
                name: 'john bocco',
                team: 'Simba SC',
                score: '16',
                year: 2021,

            },

            {
                name: 'george mpole',
                team: 'Geita Gold FC',
                score: '17',
                year: 2022,

            }


        ]


        //define routes to the application using event handler handling HTTP request 
        app.get('/api/topscorers', (request, response) => {

            response.json(topscorers)
        })
        //display information about the application
        app.get('/info', (request, response) => {
            const currentDate = new Date()
            response.send(`<h2>This Api has info for ${topscorers.length} topscorers</h2> <h2>${currentDate}</h2>`)
        })
        //handle HTTP get reequest made to topScorers
        app.get('/api/topscorers/:year', (request, response) => {
            const year = request.params.year
            console.log(year);
            const topscorer = topscorers.find(topscorer => topscorer.year == year)
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


        const generatedId = () => {
            const maxID = topscorers.length > 0 ? Math.max(...topscorers.map(entry => entry.year)) : 0
            return maxID + 1
        }

        app.post('/api/topscorers', (request, response) => {
            const body = req.body

            if (!body.name) {
                return res.status(400).json({ error: 'Name is missing' })
            }

            if (!body.team) {
                return res.status(400).json({ error: 'team is missing' })
            }
            if (!body.score) {
                return res.status(400).json({ error: 'score is missing' })
            }

            // if (topscorers.some(entry => entry.name === body.name)) {
            //     return res.status(409).json({ error: 'Name must be unique' })
            // }

            let entry = {
                year: generatedId(),
                name: body.name,
                team: body.team,
                score: body.score
            }

            persons.push(entry)
            res.json(entry)
        })
        const PORT = 3000;
        app.listen(process.env.PORT || PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });

        //install nodemon to run server automatically npm install --save-dev nodemon

    })
    .catch(error => console.error(error))
