export function AddItemToBasket(id) {
    localStorage.setItem('product' + id, "true");
}

export function RemoveItemFromBasket(id) {
    localStorage.removeItem('product' + id, "true");
}

export function BasketContainsItem(id) {
    let item = localStorage.getItem('product' + id);
    return item != undefined;
}