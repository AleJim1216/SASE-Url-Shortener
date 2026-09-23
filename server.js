process.loadEnvFile();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const shortenerRouter = require('./shortenerRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', shortenerRouter);

const mongoDB = process.env.MONGODB_URI;
async function mongoConnect() {
  await mongoose.connect(mongoDB);
  mongoose.connection.on("error", err => {
    console.err("Connection error");
  })
}

try {
  mongoConnect();
} catch {
  console.err("Could not reach MongoDB");
}

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`)
})
