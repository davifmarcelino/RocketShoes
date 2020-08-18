export function addToCartRequest(id) {
  return {
    type: 'ADD_TO_CART_REQUEST',
    id,
  };
}

export function addToCartSuccess(product) {
  return {
    type: 'ADD_TO_CART_SUCCESS',
    product,
  };
}

export function deleteFromCart(id) {
  return {
    type: 'DELETE_FROM_CART',
    id,
  };
}

export function updateAmountCartRequest(id, amount) {
  return {
    type: 'UPDATE_AMOUNT_CART_REQUEST',
    id,
    amount,
  };
}

export function updateAmountCartSuccess(id, amount) {
  return {
    type: 'UPDATE_AMOUNT_CART_SUCCESS',
    id,
    amount,
  };
}
