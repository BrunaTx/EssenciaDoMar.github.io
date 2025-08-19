const express = require("express");
const produtoRoutes = require("./routes/produtoRoutes");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", produtoRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo deu errado!");
});

module.exports = app;
