import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import App from './App.tsx';
import {BrowserRouter} from "react-router-dom";
import {store} from './redux/redux-store'
import {Provider} from "react-redux";

const rootElem = document.getElementById('root')

if (rootElem) {
    const root = ReactDOM.createRoot(rootElem as HTMLElement);
    root.render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
