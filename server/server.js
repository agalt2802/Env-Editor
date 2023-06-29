const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const fs = require("fs");
const yaml = require("js-yaml");
const format = require("date-format");
const path = require('path');
const multer = require('multer');
let PORT = 8081;
let IP = "127.0.0.1";
const {replaceTodayIntoTheString} = require('../src/commonFunctions');

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

let serverConfig = yaml.load(fs.readFileSync("./server/serverConfig.yml"))

app.get("/commons", (req, res) => {
  let envContent = yaml.load(fs.readFileSync(serverConfig.COMMONS_PATH)); //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  res.send(envContent);
});

app.get("/steps", (req, res) => {
  let envContent = yaml.load(fs.readFileSync(serverConfig.STEPS_PATH)); //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  res.send(envContent);
});

app.get("/flows", (req, res) => {
  let envContent = yaml.load(fs.readFileSync(serverConfig.ENV_PATH)); //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  res.send(envContent);
});

app.get("/crons", (req, res) => {
  let envContent = yaml.load(fs.readFileSync(serverConfig.CRONCONF_PATH)); //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  res.send(envContent);
});

app.post("/updateCommons", (req, res) => {
  let env = fs.readFileSync(serverConfig.COMMONS_PATH);
  fs.writeFileSync(replaceTodayIntoTheString(serverConfig.COMMONS_BACKUP_PATH), env);
  res.send(fs.writeFileSync(serverConfig.COMMONS_PATH, yaml.dump(req.body)));
});

app.post("/getLogs", (req, res) => {
  //req.body.date: giorno per cui sono richiesti i log
  console.log("REQ BODY DATE: " + req.body.date);
  let date = format("ddMMyyyy", new Date(req.body.date));
  console.log("FORMATTED DATE: " + date);
  let logs;
  try {
    let commons = yaml.load(fs.readFileSync(serverConfig.COMMONS_PATH))
    let logPath = commons.COMMONS.ROOTPATH + "\\" + date + "\\" + commons.COMMONS.LOG_FILE 
    console.log(logPath)
    logs = fs.readFileSync(logPath);
  } catch (error) {
    logs = false;
  }

  console.log("LOGS: " + logs);
  res.send(logs);
});

app.post("/newFlow", (req, res) => {
  let env = fs.readFileSync(serverConfig.ENV_PATH);
  fs.writeFileSync(replaceTodayIntoTheString(serverConfig.ENV_BACKUP_PATH), env);
  res.send(
    fs.appendFileSync(serverConfig.ENV_PATH, yaml.dump(req.body)) //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  );
});

app.post("/updateFlows", (req, res) => {
  let env = fs.readFileSync(serverConfig.ENV_PATH);
  fs.writeFileSync(replaceTodayIntoTheString(serverConfig.ENV_BACKUP_PATH), env);
  res.send(fs.writeFileSync(serverConfig.ENV_PATH, yaml.dump(req.body)));
});

app.post("/newCron", (req, res) => {
  let envContent = yaml.load(fs.readFileSync(serverConfig.CRONCONF_PATH)); //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  let crons = [];
  envContent.CRON_CONFS.CRONS.forEach((element) => {
    crons.push(element.RUN);
  });
  if (crons.includes(req.body.RUN)) {
    let error = new Error("cron already exists");
    res.status(500).send(error.message);
  } else {
    envContent.CRON_CONFS.CRONS.push(req.body);
    let cron = fs.readFileSync(serverConfig.CRONCONF_PATH);
    fs.writeFileSync(replaceTodayIntoTheString(serverConfig.CRONCONF_BACKUP_PATH), cron);
    res.send(fs.writeFileSync(serverConfig.CRONCONF_PATH, yaml.dump(envContent)));
  }
});

app.post("/saveEditedCron", (req, res) => {
  let envContent = yaml.load(fs.readFileSync(serverConfig.CRONCONF_PATH)); //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js

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

  let cron = fs.readFileSync(serverConfig.CRONCONF_PATH);
  fs.writeFileSync(replaceTodayIntoTheString(serverConfig.CRONCONF_BACKUP_PATH) , cron);

  res.send(fs.writeFileSync(serverConfig.CRONCONF_PATH, yaml.dump(envContent)));
});

app.get('/download/:filename', (req, res) => {
 let filename = req.params.filename;
 console.log(filename)
  const filePath = "" +serverConfig[filename];
  console.log(filePath)

  if (fs.existsSync(filePath)) {
    console.log("Entrato")

    res.download(filePath);
  } else {
    console.log("Errore")

    res.status(404).send('File not found');
  }
});




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const filePaths = [
    serverConfig.COMMONS_PATH,
    serverConfig.CRONCONF_PATH,
    serverConfig.ENV_PATH,
    serverConfig.STEPS_PATH,
  ];
  let filePath = filePaths.find(fp => path.basename(fp) === req.file.originalname);
  if (filePath) {
    const fileContents = fs.readFileSync(req.file.path, 'utf-8');
    fs.writeFileSync(filePath,fileContents,{encoding:'utf8',flag:'w'})
    fs.unlinkSync(req.file.path);

    res.json({message: "File caricato con successo."});
  } else {
    fs.unlinkSync(req.file.path);
    res.status(400).json({message: "File non permesso."});
  }
});

