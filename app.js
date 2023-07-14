const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const error404Router = require('./routes/error404');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cors());

app.use(express.urlencoded());
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64aee45a9841566d2160f8de'
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);
app.use(error404Router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
