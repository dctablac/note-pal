require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notepal';

// Connect to mongoose
mongoose.connect(MONGODB_URI)
    .then(() => console.log(`Connected to mongodb database: ${MONGODB_URI}`))
    .catch((err) => console.error(err))

// Require routes
app.use("/", require('./routes/noteRoute'))

// Check if app is deployed
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
}

app.listen(PORT, () => {
    console.log(`Express server running on port: ${PORT}`);
});