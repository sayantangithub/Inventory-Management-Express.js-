const express = require("express");
const server = express();
server.get("/", (req, res) => {
  return res.send("Welcome to Inventory App");
});
server.listen(4000);
