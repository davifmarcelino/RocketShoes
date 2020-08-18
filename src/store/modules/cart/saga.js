import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';
import { addToCartSuccess, updateAmountCartSuccess } from './actions';
import { formatPrice } from '../../../util/format';

function* addToCart({ id }) {
  const productExists = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );

  const stock = yield call(api.get, `stock/${id}`);
  const amount = productExists ? productExists.amount + 1 : 1;

  if (amount > stock.data.amount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  if (productExists) {
    yield put(updateAmountCartSuccess(id, amount));
  } else {
    const response = yield call(api.get, `products/${id}`);
    const data = {
      ...response.data,
      amount,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

function* updateToCart({ id, amount }) {
  if (amount <= 0) {
    return;
  }

  const stock = yield call(api.get, `stock/${id}`);
  if (amount > stock.data.amount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }
  yield put(updateAmountCartSuccess(id, amount));
}

export default all([
  takeLatest('ADD_TO_CART_REQUEST', addToCart),
  takeLatest('UPDATE_AMOUNT_CART_REQUEST', updateToCart),
]);
