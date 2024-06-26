import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import configureStore from "./state-management/store/configureStore"
import { AuthProvider } from './state-management/context/AuthContext';

const store = configureStore()
// console.log(store.getState())

// store.subscribe(() => {
//   console.log(store.getState())
// })

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
  </BrowserRouter>
</AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
