const { runFlow } = require("../flowsmanager");
const { getFlowNames, readFileSync } = require("../onpremjsf");
const cron = require("node-cron");
const yaml = require("js-yaml");

exports.launchCron = async (confPath) => {
  try {
    let cronsconf
    if(process.env.CRONCONF_PATH != undefined){
        cronsconf = await yaml.load(
        readFileSync(process.env.CRONCONF_PATH, "utf8")
      );
    }else{
      confPath = await yaml.load(readFileSync(confPath, "utf8"))
      cronsconf = await yaml.load(
        readFileSync(confPath.CRONCONF_PATH, "utf8"))
    }

    for (let item of cronsconf.CRON_CONFS.CRONS) {
      cron
        .schedule(
          item.INIT_SCHEDULER,
          () => {
            this.executeFlows(item.INIT_FLOWS, confPath);
          },
          {
            scheduled: false,
          }
        )
        .start();
      console.log(
        `Started cron:${item.RUN} on flows: ${item.INIT_FLOWS} with schedule:  ${item.INIT_SCHEDULER}`
      );
    }
  } catch (err) {
    console.log(`Fail to start cron with error:${err}`);
  }
};

exports.executeCron = async (request, confPath) => {
  if (request.cronConf != undefined) {
    let task = cron.schedule(
      request.cronConf,
      () => {
        this.executeFlows(request.params, confPath);
      },
      {
        scheduled: false,
      }
    );
    task.start();
  } else {
    this.executeFlows(request.params, confPath);
  }
};

exports.executeFlows = async (params, confPath) => {
  const flow = getFlowNames(confPath);
  console.log(flow);

  let args = params.split(",");
  let offset = args[args.length - 1].startsWith("-")
    ? args.pop().replace("-", "")
    : undefined;

  let firstFlow = args[0].split("-");
  if (firstFlow[0] === "ALL") {
    offset = firstFlow[1];
    args = flow;
  }
  for (let arg of args) {
    let copyArg = arg.split("-");
    offset = copyArg[1] !== undefined ? copyArg[1] : offset;
    if (copyArg[0] === "LASTFLOW") offset = undefined;
    await runFlow(copyArg[0], offset, confPath);
    offset = offset ? offset : "0";
    console.log(
      "Stiamo eseguendo: " +
        copyArg[0] +
        " con un offset: " +
        offset +
        " giorni."
    );
  }
};
