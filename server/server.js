const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const fs = require('fs')
const yaml = require("js-yaml")

let PORT = 8081;
let IP = "127.0.0.1";
let app = new express();
http.createServer(app).listen(PORT, IP, () => {
  try {
    console.log(`Express app listening at http: ${IP}:${PORT}`);
  } catch (err) {
    console.error(err);
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/steps", (req, res) => {
  let envContent = yaml.load(fs.readFileSync("./steps.yml"))//TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  console.log(envContent)
  res.send(envContent);
});

app.get("/flows", (req, res) => {
  let envContent = yaml.load(fs.readFileSync("./env.yml"))//TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  console.log(envContent)
  res.send(envContent);
});

app.post("/newFlow", (req, res) => {
  res.send(
    fs.appendFileSync("./env.yml", yaml.dump(req.body))//TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  )
});
