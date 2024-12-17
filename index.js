const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "¡Hola desde mi aplicación Node.js en ECS!" });
});

app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`);
});
