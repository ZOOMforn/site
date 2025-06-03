const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Suas keys com validade (timestamp em ms)
const keys = {
  "ABC123": Date.now() + 3600000, // expira em 1 hora
  "TESTE456": Date.now() + 86400000, // expira em 24h
};

app.get("/check", (req, res) => {
  const key = req.query.key;
  if (!key) return res.status(400).send("Key ausente");

  const expires = keys[key];
  if (!expires) return res.status(403).send("Key inválida");

  if (Date.now() > expires) {
    delete keys[key];
    return res.status(403).send("Key expirada");
  }

  res.status(200).send("Key válida");
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
