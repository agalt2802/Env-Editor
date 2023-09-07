import { getToken } from "./components/Login/Token";
import {conf} from "./conf.js";

export async function fetchWithCatch(url, params, successCallback, errorCallback, forceJSON = false) {
  const headers = params.headers || {};
  
  // Aggiungi le credenziali nell'header
  if (getToken()) {
    headers['Authorization'] = 'Bearer ' + getToken().token;
    // Aggiungi qui altre informazioni necessarie nell'header
    // headers['Custom-Header'] = 'Value';
  }

  await fetch(`https://${conf.host}:${conf.port}` + url, { ...params, headers })
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
      
      console.log(e.message);
    });
}
