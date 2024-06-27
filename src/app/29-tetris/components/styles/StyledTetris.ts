import styled from "styled-components";

export const StyledTetrisWrapper = styled.div<{}>`
    background: url('/tetris/bg.png') #000;
    background-size: cover;
    min-height: 100%;
`;

export const StyledTetris = styled.div<{}>`
    display: flex;
    align-items: flex-start;
    padding: 40px;
    max-width: 900px;

    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
        margin: 0 auto;
    }
`;
