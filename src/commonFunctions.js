import { getToken } from "./components/Login/Token";

export async function fetchWithCatch(url, params, successCallback, errorCallback, forceJSON = false) {
  if(getToken())
    params["headers"] = new Headers({ ...params.headers, Authorization: 'Bearer '+getToken().token });
  
  await fetch("https://127.0.0.1:3001" + url, params)
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
    .then(successCallback)
    .catch((e) => {
      if(errorCallback !== undefined)
        errorCallback(e);
      //else
        //ErrorHandler.addError(e);

      console.log(e.message);
    });
}
