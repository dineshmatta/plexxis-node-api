import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet'; // creates headers that protect from attacks (security)
const app = express();
require('dotenv').config()
const db = require('./db/queries')
const port = 3001;

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// App Middleware
app.use(bodyParser.json());
app.use(morgan('combined')); 
app.use(helmet())
app.use(cors(corsOptions))
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

// App Routes
app.get('/', (req, res) => {
  res.json({
    info: 'server running!'
  })
})

app.get('/api/employees', db.getUsers)
app.get('/api/employees/:id', db.getUserById)
app.post('/api/employees', db.createUser)
app.put('/api/employees/:id', db.updateUser)
app.delete('/api/employees/:id', db.deleteUser)


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
})