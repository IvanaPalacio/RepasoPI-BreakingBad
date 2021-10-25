
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
export function getNameCharacters(name){
    return async function(dispatch){
        try{
            var json = await axios.get("http://localhost:3001/characters?name=" + name);
            return dispatch({type:"GET_NAME_CHARACTERS", payload:json.data});
            }catch(error){
                console.log(error);
        }
    };
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

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function getOccupations(){ 
    return async function(dispatch){
        var info= await axios('http://localhost:3001/occupations', { 

        });
        return dispatch({type: "GET_OCCUPATIONS", payload: info.data});
    };
}

export function postCharacter(payload){ 
    return async function(dispatch){
        var response= await axios.post('http://localhost:3001/character', payload)
        console.log(response)
        return response;
    };
}
