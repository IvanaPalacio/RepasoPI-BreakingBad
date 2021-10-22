const initialState = {
    characters : [],
    allCharacters:[]
}

function rootReducer (state = initialState, action) {
switch(action.type) {
    case 'GET_CHARACTERS':
        return{
            ...state,
            characters: action.payload, //mandá todo lo que te mande la cción get_characters
            allCharacters: action.payload
        }
        case 'FILTER_BY_STATUS':
            const allCharacters = state.allCharacters
            const statusFiltered = action.payload === 'All' ? allCharacters : allCharacters.filter(e => e.status === action.payload)    
        return{
            ...state,
            characters: statusFiltered
            }
            case 'FILTER_CREATED':
            const createdFilter = action.payload === 'created' ? state.allCharacters.filter(e => e.createInDb) : state.allCharacters.filter(e => !e.createInDb)
            return{
                ...state,
                characters: action.payload === 'All' ? state.allCharacters : createdFilter
            }
            default:
            return state;
    }
}
export default rootReducer;