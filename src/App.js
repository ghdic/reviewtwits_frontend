// import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css' ;
import {AuthProvider} from "./conponent/AuthProvider";
import {BrowserRouter, Switch} from "react-router-dom";
import RouterManager from "./conponent/RouterManager";
import React from "react";
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
  }

  :root {
    --blue: #287bff;
    --blue2: #82a7e8;
    --red: #f00000;
    --white: #fff;
    --grey: #f5f5f5;
    --black1: #222;
    --black2: #999;
    --gray: #606060;
    --gray2: #ebeef2
  }

  body {
    min-height: 100vh;
    display: flex;
    font-weight: 400;
    font-family: sans-serif;
    overflow-x: hidden;
    background: #FFFFFF/*linear-gradient(to right, #f64f59, #c471ed, #12c2e9);*/ /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }

  body, .App, #root, .outer {
    width: 100%;
    height: 100%;
  }

`

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <GlobalStyle />
                <RouterManager/>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
