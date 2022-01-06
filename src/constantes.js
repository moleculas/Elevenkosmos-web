let rutaApi, rutaServer
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    rutaApi = "http://localhost/api_elevenkosmos/";
    //rutaServer = window.location.protocol + "//" + window.location.host   
} else {
    //rutaServer = window.location.protocol + "//" + window.location.host;
    rutaServer = "https://elevenkosmos.net/";
    rutaApi = rutaServer + "/api/";
}

const subdirectoriProduccio = '';
//afegir a package.json: "homepage": "https://domini/subdomini",

const Constantes = {
    SUBDIRECTORI_PRODUCCIO: subdirectoriProduccio,
    RUTA_API: rutaApi,   
};
export default Constantes;
