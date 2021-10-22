
//Acciones que necesito crear para empezar a trabajar en componentes del Home 
import axios from 'axios';

//conxión entre el back y el front
export function getCharacters(){
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/characters',{
}); //me traigo la ruta del back donde me traigo los personajes

        return dispatch({
            type: 'GET_CHARACTERS', 
            payload: json.data,
        })
    }
}

//no armar mucha lógica por acá, tratar de hacerlo en reducer o en componente
export function filterCharactersByStatus(payload){
    console.log(payload)
    return{
        type: 'FILTER_BY_STATUS',
        payload
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}
