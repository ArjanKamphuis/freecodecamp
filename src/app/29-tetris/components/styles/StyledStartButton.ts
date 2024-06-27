import styled from "styled-components";

export const StyledStartButton = styled.button<{}>`
    margin: 0 0 20px 0;
    padding: 20px;
    min-height: 30px;
    width: 100%;
    border-radius: 20px;
    color: white;
    background: #333;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    cursor: pointer;

    &:hover { background: #444; }
    &:active { background: #555; }
`;
