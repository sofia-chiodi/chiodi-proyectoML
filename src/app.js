const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "../public"))); // archivos estaticos que se pueden usar en cualquier lado. Se le da acceso a toda la carpeta de una

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Se prendio en el puerto ${PORT}`);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/home.html"));
});

