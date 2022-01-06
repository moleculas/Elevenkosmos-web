import axios from 'axios';
import Constantes from "../constantes";

//constantes
const rutaApi = Constantes.RUTA_API;

const dataInicial = {
    loadingApp: false,
    arrayNfts: [],
    errorDeCargaNfts: false,
    exitoActualizacionLikes: false,
    exitoCheckearKey: null,
    cambiamosItemNft: {
        valor: false,
        id: null
    },
    objetoDevueltoKey: {}
}

//types
const LOADING_APP = 'LOADING_APP';
const OBTENER_NFTS_EXITO = 'OBTENER_NFTS_EXITO';
const ERROR_DE_CARGA_NFTS = 'ERROR_DE_CARGA_NFTS';
const ACTUALIZAR_LIKES_EXITO = 'ACTUALIZAR_LIKES_EXITO';
const RESETEA_EXITO_NFTS = 'RESETEA_EXITO_NFTS';
const OBTENER_KEY_EXITO = 'OBTENER_KEY_EXITO';
const OBTENER_KEY_FALLO = 'OBTENER_KEY_FALLO';
const CAMBIAMOS_ITEM_NFT_ACCION = 'CAMBIAMOS_ITEM_NFT_ACCION';

//reducer
export default function appReducer(state = dataInicial, action) {
    switch (action.type) {
        case LOADING_APP:
            return { ...state, loadingApp: true }
        case OBTENER_NFTS_EXITO:
            return { ...state, arrayNfts: action.payload.array, errorDeCargaNfts: action.payload.errorDeCargaNfts, loadingApp: false }
        case ERROR_DE_CARGA_NFTS:
            return { ...state, errorDeCargaNfts: true, loadingApp: false }
        case ACTUALIZAR_LIKES_EXITO:
            return { ...state, exitoActualizacionLikes: true, errorDeCargaNfts: action.payload.errorDeCargaNfts }
        case RESETEA_EXITO_NFTS:
            return { ...state, exitoActualizacionLikes: false, exitoCheckearKey: null }
        case OBTENER_KEY_EXITO:
            return { ...state, exitoCheckearKey: 'si', objetoDevueltoKey: action.payload.objetoDevuelto }
        case OBTENER_KEY_FALLO:
            return { ...state, exitoCheckearKey: 'no' }
        case CAMBIAMOS_ITEM_NFT_ACCION:
            return { ...state, cambiamosItemNft: action.payload.objeto }
        default:
            return { ...state }
    }
}

//acciones

export const obtenerNftsAccion = (objeto) => async (dispatch, getState) => {
    dispatch({
        type: LOADING_APP
    });
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        let apiUrl = rutaApi + "listar.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuesta = res.data;
        dispatch({
            type: OBTENER_NFTS_EXITO,
            payload: {
                array: respuesta,
                errorDeCargaNfts: false
            }
        })
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_NFTS
        })
    }
}

export const actualizarLikesAccion = (objeto, id, likes) => async (dispatch, getState) => {
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        formData.append("likes", likes);
        let apiUrl = rutaApi + "actualizar_likes.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuesta = res.data;
        dispatch({
            type: ACTUALIZAR_LIKES_EXITO,
            payload: {
                errorDeCargaNfts: false
            }
        });
        dispatch({
            type: RESETEA_EXITO_NFTS
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_NFTS
        })
    }
}

export const checkearKeyAccion = (objeto, id, key) => async (dispatch, getState) => {
    try {
        const formData = new FormData();
        formData.append("objeto", objeto);
        formData.append("id", id);
        formData.append("key", key);
        let apiUrl = rutaApi + "checkear_key.php";
        const res = await axios.post(apiUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        const respuesta = res.data;
        if (respuesta) {
            dispatch({
                type: OBTENER_KEY_EXITO,
                payload: {
                    objetoDevuelto: {
                        titulo: respuesta.titulo,
                        urlKey: respuesta.url_key
                    }
                }                
            });
        } else {
            dispatch({
                type: OBTENER_KEY_FALLO,
            });
        }
        dispatch({
            type: RESETEA_EXITO_NFTS
        });
    } catch (error) {
        dispatch({
            type: ERROR_DE_CARGA_NFTS
        })
    }
}

export const setCambiamosItemNftAccion = (valor, id) => (dispatch, getState) => {
    let objeto = { valor: valor, id: id };
    dispatch({
        type: CAMBIAMOS_ITEM_NFT_ACCION,
        payload: {
            objeto: objeto
        }
    })
}