const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const fs = require("fs");
const yaml = require("js-yaml");
const format = require("date-format");

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
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/steps", (req, res) => {
  let envContent = yaml.load(fs.readFileSync("./server/steps.yml")); //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  res.send(envContent);
});

app.get("/flows", (req, res) => {
  let envContent = yaml.load(fs.readFileSync("./server/env.yml")); //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  res.send(envContent);
});

app.get("/crons", (req, res) => {
  let envContent = yaml.load(fs.readFileSync("./server/cronConf.yml")); //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  res.send(envContent);
});

app.post("/getLogs", (req, res) => {
  //req.body.date: giorno per cui sono richiesti i log
  console.log("REQ BODY DATE: " + req.body.date);
  let date = format("ddMMyyyy", new Date(req.body.date));
  console.log("FORMATTED DATE: " + date);
  let logs;
  try {
    logs = fs.readFileSync(
      "C:\\Users\\agalt\\OneDrive\\Desktop\\conf\\CT_FLOWS\\" +
        date +
        "\\log.txt"
    );
  } catch (error) {
    logs = false;
  }

  console.log("LOGS: " + logs);
  res.send(logs);
});

app.post("/newFlow", (req, res) => {
  let env = fs.readFileSync("./server/env.yml");
  fs.writeFileSync("./server/env_backup.yaml", env);
  res.send(
    fs.appendFileSync("./server/env.yml", yaml.dump(req.body)) //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  );
});

app.post("/updateFlows", (req, res) => {
  let env = fs.readFileSync("./server/env.yml");
  fs.writeFileSync("./server/env_backup.yaml", env);
  res.send(fs.writeFileSync("./server/env.yml", yaml.dump(req.body)));
});

app.post("/newCron", (req, res) => {
  let envContent = yaml.load(fs.readFileSync("./server/cronConf.yml")); //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  let crons = [];
  envContent.CRON_CONFS.CRONS.forEach((element) => {
    crons.push(element.RUN);
  });
  if (crons.includes(req.body.RUN)) {
    let error = new Error("cron already exists");
    res.status(500).send(error.message);
  } else {
    envContent.CRON_CONFS.CRONS.push(req.body);
    let cron = fs.readFileSync("./server/cronConf.yml");
    fs.writeFileSync("./server/cronConf_backup.yaml", cron);
    res.send(fs.writeFileSync("./server/cronConf.yml", yaml.dump(envContent)));
  }
});

app.post("/saveEditedCron", (req, res) => {
  let envContent = yaml.load(fs.readFileSync("./server/cronConf.yml")); //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js

  console.log(req.body);

  let indexToEdit;
  let cronFlows;
  envContent.CRON_CONFS.CRONS.forEach((element) => {
    if (element.RUN == req.body.RUN)
      indexToEdit = envContent.CRON_CONFS.CRONS.indexOf(element);
  });
  req.body.INIT_FLOWS.forEach((element) => {
    cronFlows = cronFlows ? cronFlows + "," + element : element;
  });
  req.body.INIT_FLOWS = cronFlows;

  envContent.CRON_CONFS.CRONS.splice(indexToEdit, 1, req.body);
  console.log("Updated crons: " + JSON.stringify(envContent.CRON_CONFS.CRONS));

  let cron = fs.readFileSync("./server/cronConf.yml");
  fs.writeFileSync("./server/cronConf_backup.yaml", cron);

  res.send(fs.writeFileSync("./server/cronConf.yml", yaml.dump(envContent)));
});
