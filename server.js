require('dotenv').config();
const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

// connect to mongoose
mongoose.connect(DATABASE_URL)
    .then(() => console.log(`Connected to mongodb database: ${DATABASE_URL}`))
    .catch((err) => console.error(err))
// require route
app.use("/", require('./routes/noteRoute'))

app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});