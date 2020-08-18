import produce from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART_SUCCESS':
      return produce(state, (draft) => {
        draft.push(action.product);
      });
    case 'DELETE_FROM_CART':
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.id);
        if (productIndex >= 0) {
          draft.splice(productIndex, 1);
        }
      });

    case 'UPDATE_AMOUNT_CART_SUCCESS': {
      return produce(state, (draft) => {
        const productIndex = draft.findIndex((p) => p.id === action.id);
        if (productIndex >= 0) {
          draft[productIndex].amount = action.amount;
        }
      });
    }
    default:
      return state;
  }
}
