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
  let envContent = yaml.load(fs.readFileSync("./server/steps.yml"))//TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  res.send(envContent);
});

app.get("/flows", (req, res) => {
  let envContent = yaml.load(fs.readFileSync("./server/env.yml"))//TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  res.send(envContent);
});

app.get("/crons", (req, res) => {
  let envContent = yaml.load(fs.readFileSync("./server/cronConf.yml"))//TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  res.send(envContent);
});

app.post("/newFlow", (req, res) => {
  res.send(
    fs.appendFileSync("./server/env.yml", yaml.dump(req.body))//TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  )
});

app.post("/updateFlows", (req, res) => {
  res.send(
    fs.writeFileSync("./server/env.yml", yaml.dump(req.body))
  )
});

app.post("/newCron", (req, res) => {
  let envContent = yaml.load(fs.readFileSync("./server/cronConf.yml"))//TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  let crons = [];
  envContent.CRON_CONFS.CRONS.forEach(element => {
    crons.push(element.RUN)
  });
  if(crons.includes(req.body.RUN)){
    let error = new Error("cron already exists")
    res.status(500).send(error.message)

  }else{
    envContent.CRON_CONFS.CRONS.push(req.body)
  res.send(
    fs.writeFileSync("./server/cronConf.yml", yaml.dump(envContent))
  )
  }
  
});

app.post("/saveEditedCron", (req, res) => {
  let envContent = yaml.load(fs.readFileSync("./server/cronConf.yml"))//TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  
  console.log(req.body)

  let indexToEdit;
  let cronFlows;
  envContent.CRON_CONFS.CRONS.forEach((element) =>{
    if(element.RUN == req.body.RUN)
    indexToEdit = envContent.CRON_CONFS.CRONS.indexOf(element)
  })
  req.body.INIT_FLOWS.forEach((element) => {
    cronFlows = cronFlows ? cronFlows + "," + element : element
  })
  req.body.INIT_FLOWS = cronFlows

  envContent.CRON_CONFS.CRONS.splice(indexToEdit, 1, req.body) 
  console.log("Updated crons: " + JSON.stringify(envContent.CRON_CONFS.CRONS))

  
  res.send(
    fs.writeFileSync("./server/cronConf.yml", yaml.dump(envContent))
  )
  }
  
);