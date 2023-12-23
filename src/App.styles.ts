import styled, { createGlobalStyle } from "styled-components";

import BGImage from './images/background.jpg';

export const GlobalStyle = createGlobalStyle`
    html { 
        height: 100%;
        width: 100%;
    }
    body { 
        background-image: url(${BGImage});
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
    }
    * {
        box-sizing: border-box;
        font-family: "Catamaran", sans-serif;
    }

`
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > p {
        color: #fff;
    }
    .score {
        color: #fff;
        font-size: 2rem;
        margin: 0;
    }
    h1 {
        font-family: Fascinate Inline, Haettenschweiler, 'Arial Narrow bold', sans-serif;
        background-image: linear-gradient(180deg, #fff, #87f1ff);
        background-size: 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
        filter: drop-shadow(2px 2px #0085a3);
        font-size: 70px;
        font-weight: 400;
        text-align: center;
        margin: 20px;
    }
    .start, .next{
        background: linear-gradient(180deg, #fff, #ffcc91);
        border: 2px solid #d38558;
        box-shadow: 10px;
        margin: 20px 0px;
        padding: 0 40px;
    }
    .start{ 
        max-width: 200px;
    }
`