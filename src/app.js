// Require's
const express = require('express');
const path = require('path');

// Ejecucion de express
const app = express();

// Middlewares
app.use(express.static(path.join(__dirname, '../public')));

// Template engines
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Sistema de routeo
const mainRoutes = require('./routes/mainRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');

app.use('/', mainRoutes);
app.use('/users', usersRoutes);

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).render('not-found');
});

// Puerto
const PORT = process.env.PORT || 3013;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
