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
