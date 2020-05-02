const basket = (state = [], action) => {
    switch (action.type) {
        case 'ADD_BASKET':
            return [
                ...state,
                {
                    id: action.id,
                    count: action.count
                }
            ]
        case 'REMOVE_BASKET':
            return state.filter(e => e.id !== action.id)
        default:
            return state
    }
}

export default basket