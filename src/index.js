import React from "react";
import ReactDOM from "react-dom";
import "./normalize.css";
import "./global.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const API_URI = "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=";
const API_KEY = "YKRi1r2uqATpwHGkRSKcRqLR31SUt2kl";
const API = `${API_URI}${API_KEY}`;

ReactDOM.render(
  <React.StrictMode>
    <App API={API} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
