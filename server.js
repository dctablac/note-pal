require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

// connect to mongoose
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to mongodb database.'))
    .catch((err) => console.error(err))
// require route
app.use("/", require('./routes/noteRoute'))

app.listen(3001, () => {
    console.log('Express server running on port 3001')
});