import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
