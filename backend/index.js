const connectToMongo = require('./db');
const express = require('express')
const app = express()
const port = 5000

var cors = require('cors')

app.use(cors())


app.use(express.json());

//ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`myNotebook backend listening on http://localhost:${port}`)
})
connectToMongo();