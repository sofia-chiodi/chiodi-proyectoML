/* Require's */
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');

/* Express */
const app = express();

/* Middlewares */
const userLogged = require('./middlewares/userLogged');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(
  session({
    secret: 'Mercado Liebre',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookies());
app.use(userLogged);

/* Template engines */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

/* Route system */
const mainRoutes = require('./routes/mainRoutes');
app.use('/', mainRoutes);

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).render('not-found');
});

// Puerto
const PORT = process.env.PORT || 3013;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
