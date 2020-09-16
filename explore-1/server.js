const express = require("express");

const app = express();

const PORT = 9098;

app.get("/api/info", (req, res) => {
  res.json({
    hello: "world",
  });
});

app.listen(PORT);
