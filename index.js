require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
// TODO routes link here
const categoryRoute = require('./routes/category')

app.use(
  cors({origin: '*'})
)
app.use(express.json())
app.use('/images', express.static('images'))
app.use('/api/category', categoryRoute);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to MongoDB'))

const PORT = 8080;
app.listen(PORT, () => console.log('server started - ' + PORT))
