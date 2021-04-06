import React from "react";
import ReactDOM from "react-dom";
import Root from "./root";

if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }


document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    ReactDOM.render(<Root />, root);
});
