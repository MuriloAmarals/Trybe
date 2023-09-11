const express = require('express');

const userController = require('./controller/userController');
const categoriesController = require('./controller/categoryController');
const blogPostController = require('./controller/blogPostController');
const { auth } = require('./middlewares/auth');

const app = express();

app.use(express.json());

app.post('/login', userController.userLogin);
app.post('/categories', auth, categoriesController.createCategory);
app.get('/categories', auth, categoriesController.getCategories);
app.post('/post', auth, blogPostController.addBlog);
app.get('/post', auth, blogPostController.getPosts);
app.get('/post/search', auth, blogPostController.postSearch);
app.get('/post/:id', auth, blogPostController.getById);
app.put('/post/:id', auth, blogPostController.updateBlog);
app.delete('/post/:id', auth, blogPostController.deleteBlog);
app.post('/user', userController.createUser);
app.get('/user', auth, userController.getUsers);
app.get('/user/:id', auth, userController.userGetById);
app.delete('/user/me', auth, userController.deleteMe);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
