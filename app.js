const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const cors = require('cors');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const error404Router = require('./routes/error404');
const authRouter = require('./routes/auth');

const authMiddleware = require('./middlewares/auth');
const errorsMiddleware = require('./middlewares/errors');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cors());

app.use(express.urlencoded());
app.use(express.json());

app.use(authRouter);
app.use(authMiddleware);
app.use(userRouter);
app.use(cardRouter);
app.use(error404Router);

app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
