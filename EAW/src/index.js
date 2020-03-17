import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";//return เป็น function ได้ asynconouse ในการ update state
import { Provider } from "react-redux";// OHC อยากให้ทุก components เข้าถึง redux ได้
import reducers from "./reducers";
import logger from "redux-logger";

// bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

const store = createStore(reducers, applyMiddleware(thunk, logger));//สร้าง store 

const ReduxApp = (
    <Provider store={store} >
        <App/>
    </Provider>
)

ReactDOM.render(ReduxApp, document.getElementById('root'));

