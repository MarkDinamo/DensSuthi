const basket = (state = [], action) => {
    switch (action.type) {
        case 'ADD_BASKET':
            if (state.length > 0) {
                let data = state.filter(e => e.id !== action.id)
                return [...data,
                {
                    id: action.id,
                    count: action.count
                }]
            }
            return [...state,
            {
                id: action.id,
                count: action.count 
            }]
        case 'REMOVE_BASKET':
            return state.filter(e => e.id !== action.id)
        case 'CLEAR_BASKET':
            return [];
        default:
            return state
    }
}

export default basket