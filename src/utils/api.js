const API_URL = 'http://localhost:3001'; //Donde esta corriendo el JSON server
 
// Hace un request de un json
function parseResponse(response) {
  return response.json();
}

// Verifica que el status sea en el rango de los 200´s ( que todo esta bien ) para mandar 
// una respuesta , si no, mando el error y lo imprimo en consola ( solo se hace en desarrollo)
function checkResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`Fetch error: ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  throw error;
}

function handleError(error) {
  console.log(error);
  return [];
}

function createQuery(queryObject) {
    return `?${Object.keys(queryObject)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`)
        .join('&')}`;
  }

// recibe un path, hacemos un rest application 
function getData(path) {
  return fetch(`${API_URL}/${path}`).then(checkResponse).then(parseResponse).catch(handleError);
}

function getDataWithQuery(queryObject,  path) {
    return getData(`${path}${createQuery(queryObject)}`);
}

function postData(path,data) {
  return fetch(
    `${API_URL}/${path}`,
    {
      method: 'POST' ,
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(data),
    }).then(checkResponse).then(parseResponse).catch(handleError);
}

function patchData(path,id,data) {
  return fetch(
      `${API_URL}/${path}/${id}`,
      {
        method: 'PATCH' ,
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
      }).then(checkResponse).then(parseResponse).catch(handleError);
}

function deleteData(path,id) {
  return fetch(
      `${API_URL}/${path}/${id}`,
      {
        method: 'DELETE' ,
      });
}

export {
  getData,
  getDataWithQuery,
  postData,
  patchData,
  deleteData,
};