import express from 'express';

const PORT = process.env.PORT || 8080;

const app = express();

app.use('/build', express.static('build'));
app.use(express.static('public'));

app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT}!`);
  });
