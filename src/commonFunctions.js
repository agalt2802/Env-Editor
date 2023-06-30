const format = require("date-format");

exports.saveData = async () => {
  await fetch("http://127.0.0.1:8081/newFlow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(flow),
  }).catch((error) => console.log(error));
  console.log("salva flusso");
};

exports.reset = () => {
  setSteps({});
  setFlow({});
  setSelectedStep("-- Scegli uno step --");
  setStepIndex(-1);
  setInputValue("");
};

exports.replaceTodayIntoTheString = (instr) => {
  try {
    let destinationfile = instr;
    const regexpFormat = /\%[\w\s\-\:]+\%/g;
    const matchedarray = instr.match(regexpFormat);
    let date = new Date();

    if (matchedarray != null && matchedarray.length == 1) {
      destinationfile = instr.replace(
        regexpFormat,
        format(matchedarray[0].replaceAll("%", ""), date)
      );
    }
    return destinationfile;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export async function fetchWithCatch(url, params, success, error, forceJSON = false)
{
  await fetch("http://127.0.0.1:8081"+url, params)
  .then((response) => {
    if(response.ok)
    {
      const contentType = response.headers.get("content-type");
      let isJSON = (contentType && contentType.indexOf("application/json") !== -1);

      return ((isJSON || forceJSON) ? response.json() : response.blob());
    }
    else
    {
      let error = new Error(response.statusText);
      error.status = response.status;
      
      throw error;
    }
  })
  .then(success)
  .catch((error !== undefined) ? error : console.log);
};