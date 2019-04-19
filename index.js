const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet') // creates headers that protect from attacks (security)
const app = express();
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

app.get('/', (req, res) => {
  res.json({
    info: 'server running!'
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
})