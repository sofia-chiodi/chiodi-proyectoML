const express = require('express');
const path = require('path');

const mainRoutes = require('./routes/mainRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 3013;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/', mainRoutes);
app.use('/users', usersRoutes);
