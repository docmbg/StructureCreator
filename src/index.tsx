import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducers from './reducers/index';
import App from './containers/App';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
// import { customPromiseMiddleware } from './middleware/worker_middleware';

const composeEnhancers = window[`__REDUX_DEVTOOLS_EXTENSION_COMPOSE__`] || compose;
const store = createStore(
  reducers,
  composeEnhancers(
    // applyMiddleware(
    //   customPromiseMiddleware,
    // ),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
