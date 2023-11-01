const mongoose = require('mongoose');
const app = require('./app');

const dburl = 'mongodb+srv://Mahee:Mahee123@cluster0.bndg37a.mongodb.net/movieDB?retryWrites=true&w=majority';

async function connect() {
    try {
        await mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });
    } catch (error) {
        console.error(error);
    }
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

connect();
