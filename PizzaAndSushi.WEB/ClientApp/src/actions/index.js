import { ADD_BASKET, REMOVE_BASKET, CLEAR_BASKET, UPDATE_BASKET } from '../constants/ActionType';
export const addToBasket = (id, count) => ({
    type: ADD_BASKET,
    id,
    count
})

export const removeFromBasket = (id) => ({
    type: REMOVE_BASKET,
    id
})

export const clearBasket = () => ({
    type: CLEAR_BASKET
})
