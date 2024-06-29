const express = require('express');
const userRoutes = require('./routes/userRoutes');
const UserServise = require('./services/userService');
const UserController = require('./controllers/userController');


const app = express();
const port = 5000;

const userModel = require('./reposio/userModel');

const userService = new UserServise(userModel);
const userController = new UserController(userService);

app.use(express.json());
app.use('/users', userRoutes(userController));

app.listen(port, () => {
  console.log(`Сервер запущен и доступен по http://localhost:${port}`);
});
