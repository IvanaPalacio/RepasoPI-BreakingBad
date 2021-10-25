const initialState = {
    characters : [],
    allCharacters:[],
    occupations:[]
}

function rootReducer (state = initialState, action) {
switch(action.type) {
    case 'GET_CHARACTERS':
        return{
            ...state,
            characters: action.payload, //mandá todo lo que te mande la cción get_characters
            allCharacters: action.payload
        }
        case 'GET_NAME_CHARACTERS':
            return{
                ...state,
                characters:action.payload
            }
            case 'GET_OCCUPATIONS':
                return{
                    ...state,
                    occupations:action.payload
                }
        case 'FILTER_BY_STATUS':
            const allCharacters = state.allCharacters
            const statusFiltered = action.payload === 'All' ? allCharacters : allCharacters.filter(e => e.status === action.payload)    
        return{
            ...state,
            characters: statusFiltered
            }
            case "POST_CHARACTER":
                return{
                    ...state,
                }
            case 'FILTER_CREATED':
            const createdFilter = action.payload === 'created' ? state.allCharacters.filter(e => e.createInDb) : state.allCharacters.filter(e => !e.createInDb)
            return{
                ...state,
                characters: action.payload === 'All' ? state.allCharacters : createdFilter
            }
            case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ? 
            state.characters.sort(function(a,b){
            if(a.name > b.name){
            return 1;
            }
            if(b.name > a.name){
                return -1;
            }
            return 0;
        }) : 
        state.characters.sort(function (a,b){
            if(a.name > b.name){
                return -1;
            }
            if(b.name > a.name){
                return 1;
            }return 0;
        });
        return{
            ...state,
            characters: sortedArr
        }  
            default:
            return state;
        };
};

export default rootReducer;