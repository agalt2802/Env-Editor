export async function saveData() {
  await fetch("http://127.0.0.1:8081/newFlow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(flow),
  }).catch((error) => console.log(error));
  console.log("salva flusso");
}

export function reset() {
  setSteps({});
  setFlow({});
  setSelectedStep("-- Scegli uno step --");
  setStepIndex(-1);
  setInputValue("");
}

export async function fetchWithCatch(url, params, success, error, forceJSON = false) {
  await fetch("http://127.0.0.1:3001" + url, params)
    .then((response) => {
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        let isJSON = contentType && contentType.indexOf("application/json") !== -1;

        return (isJSON || forceJSON) ? response.json() : response.blob();
      } else {
        let error = new Error(response.statusText);
        error.status = response.status;

        throw error;
      }
    })
    .then(success)
    .catch((error !== undefined) ? error : console.log);
}
