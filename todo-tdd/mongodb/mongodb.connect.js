const mongoose = require('mongoose');

async function connect() {
    try {
        // await mongoose.connect("mongodb://user:password@localhost:27017/tests");
        await mongoose.connect("mongodb://localhost:27017/tests");
        console.log('Connected to mongodb');
    }
    catch (err) {
        console.error('Error connecting to mongodb');
        console.error(err);
    }
}

module.exports = { connect };