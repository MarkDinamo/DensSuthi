import { ADD_BASKET, REMOVE_BASKET } from '../constants/ActionType';
export const addToBasket = id => ({
    type: ADD_BASKET,
    id
})

export const removeFromBasket = id => ({
    type: REMOVE_BASKET,
    id
})