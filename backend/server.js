require('dotenv').config();

const app = require("./app");
const mongoose = require("mongoose");
const run = async () => {
    try {
        const port = process.env.PORT || 3000;
        await mongoose.connect(process.env.DATABASE_URL);
        app.listen(port, () => console.log(`Listening on port: ${port}`));
    }
    catch (err) {
        console.log(`FAILED TO START: ${err}`)
    }
}

run();

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0);
});

