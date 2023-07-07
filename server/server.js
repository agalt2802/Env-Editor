const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const fs = require("fs");
const yaml = require("js-yaml");
const format = require("date-format");
const path = require('path');
const multer = require('multer');
const e = require("express");
const cors = require('cors');

let PORT = 3001;
let IP = "0.0.0.0";
const {replaceTodayIntoTheString} = require('./utils');

class HTTPError extends Error
{
  constructor(message, code = 500)
  {
    super(message);
    
    this.statusCode = code;
  }
}

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
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors());

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

function editConf(path, backupPath, process, success)
{
  let envContent = yaml.load(fs.readFileSync(serverConfig.CRONCONF_PATH)); //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js
  envContent = process(envContent);

  fs.writeFileSync(replaceTodayIntoTheString(backupPath) , fs.readFileSync(path));
  fs.writeFileSync(path, yaml.dump(envContent));

  (success !== undefined) && success();
}

function getAllCrons()
{
  let envContent = yaml.load(fs.readFileSync(serverConfig.CRONCONF_PATH)); //TOCONFIG: funziona se si espone lanciando da ../server/ con node server.js

  return envContent.CRON_CONFS.CRONS;
}

function getCron(req, res)
{
  let cronId = req.params.id;
  let crons = getAllCrons();

  let cronIndex = crons.findIndex((element) => element.RUN == cronId);
  if(cronIndex < 0)
    throw new HTTPError("Cron doesn't exists!");

  res.send(crons[cronIndex]);
}

function setCron(req, res, overwrite)
{
  let cronId = req.params.id;
  let cronData = req.body;

  editConf(serverConfig.CRONCONF_PATH, serverConfig.CRONCONF_BACKUP_PATH, (content) =>
  {
    let indexToEdit = content.CRON_CONFS.CRONS.findIndex((element) => element.RUN == cronId);
    if(indexToEdit >= 0 && !overwrite)
      throw new HTTPError("Cron already exists!", 409);
  
    if(indexToEdit < 0)
      content.CRON_CONFS.CRONS.push(cronData);
    else
      content.CRON_CONFS.CRONS[indexToEdit] = cronData;

    return content;
  }, () =>
  {
    console.log("Cron", cronData.RUN, "updated");
  
    res.send(cronData);  
  });
}

function cronChangeStatus(req, res, enable)
{
  let cronId = req.params.id;
  let cronData = req.body;

  let cron;
  editConf(serverConfig.CRONCONF_PATH, serverConfig.CRONCONF_BACKUP_PATH, (content) =>
  {
    let indexToEdit = content.CRON_CONFS.CRONS.findIndex((element) => element.RUN == cronId);
    if(indexToEdit < 0)
    throw new HTTPError("Cron doesn't exists!");
  
    content.CRON_CONFS.CRONS[indexToEdit].ENABLED = enable;

    cron = content.CRON_CONFS.CRONS[indexToEdit];

    return content;
  }, () =>
  {
    console.log("Cron", cron, (enable ? "enabled" : "disabled"));

    res.send(cron);  
  });
}

function deleteCron(req, res)
{
  let cronId = req.params.id;

  let cron;
  editConf(serverConfig.CRONCONF_PATH, serverConfig.CRONCONF_BACKUP_PATH, (content) =>
  {
    let indexToEdit = content.CRON_CONFS.CRONS.findIndex((element) => element.RUN == cronId);
  
    cron = content.CRON_CONFS.CRONS[indexToEdit];
    content.CRON_CONFS.CRONS.splice(indexToEdit, 1);

    return content;
  }, () =>
  {
    console.log("Cron", cron, "deleted");

    res.send(cron);
  });
}

app.put('/crons/:id/enable', (req, res) => { cronChangeStatus(req, res, true); });
app.put('/crons/:id/disable', (req, res) => { cronChangeStatus(req, res, false); });
app.get('/crons/:id', getCron);
app.put('/crons/:id', (req, res) => { setCron(req, res, true); });
app.post('/crons/:id', (req, res) => { setCron(req, res, false); });
app.delete('/crons/:id', deleteCron);
app.get("/crons", (req, res) => { res.send(getAllCrons()); });

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

// Get secrets structure from file 
app.get('/secrets', (req, res) => {
  try{
    let secrets = yaml.load(fs.readFileSync(serverConfig.SECRETS_PATH));
    console.log(secrets)
    res.send(secrets);
  }catch(error){
    res.status(500).send(error.message);
  }
  
})

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

//Error handler
app.use((err, req, res, next) => {
  if(res.headersSent)
    return next(err);

  res.status(err.statusCode || 500).send(err.message);
});
