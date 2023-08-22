const express = require("express");
const path = require("path");

const app = express(); // lo ejecutamos para obtener un obj con metodos

app.use(express.static(path.join(__dirname, "../public"))); // archivos estaticos que se pueden usar en cualquier lado. Se le da acceso a toda la carpeta de una

// const PORT = 3000;

// app.listen(PORT, () => {
//   console.log(`Se prendio en el puerto ${PORT}`);
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.get("/", (req, res) => {
  //ruta parametro 1, callback que se ejecutara al obtener la ruta (parametro 2)
  res.sendFile(path.join(__dirname, "views/home.html"));
});
app.get("/login.html", (req, res) => {
  //ruta parametro 1, callback que se ejecutara al obtener la ruta (parametro 2)
  res.sendFile(path.join(__dirname, "views/login.html"));
});
app.get("/register.html", (req, res) => {
  //ruta parametro 1, callback que se ejecutara al obtener la ruta (parametro 2)
  res.sendFile(path.join(__dirname, "views/register.html"));
});
