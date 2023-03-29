const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { executeCron, launchCron } = require("../services/cronService");
const fs = require('fs')
const yaml = require("js-yaml")
// let key = fs.readFileSync(
//     "C:\\Users\\agalt\\OneDrive\\Desktop\\Socket\\server\\Cert\\server.key"
//   );
// let cert = fs.readFileSync(
//     "C:\\Users\\agalt\\OneDrive\\Desktop\\Socket\\server\\Cert\\server.crt"
//   );
// let options = {
//     key: key,
//     cert: cert,
//   };
let PORT = 8081;
let IP = "127.0.0.1";
let app = new express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let confPath = process.argv.slice(2)[0]

http.createServer(app).listen(PORT, IP, () => {
  try {
    console.log(`STARTING INIT CRONS`);
    launchCron(confPath);
    console.log(`Express app listening at http: ${IP}:${PORT}`);
  } catch (err) {
    console.error(err);
  }
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post("/runFlows", (req, res) => {
  const requestBody = req.body;
  executeCron(requestBody, confPath);
  res.send({
    success: true,
  });
});

app.get("/healthCheck", (req, res) => {
  res.send({
    success: true,
  });
});

app.get("/steps", (req, res) => {
  let envContent = yaml.load(fs.readFileSync("./conf/steps.yml"))
  console.log(envContent)
  res.send(envContent);
});

app.post("/newFlow", (req, res) => {
  res.send(
    fs.appendFileSync("./conf/env.yml", yaml.dump(req.body))
  )
});
