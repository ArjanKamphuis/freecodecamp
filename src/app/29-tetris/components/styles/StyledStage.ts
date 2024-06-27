import styled from "styled-components";

export const StyledStage = styled.div<{width: number, height: number}>`
    display: grid;
    grid-template-rows: repeat(${props => props.height}, 2rem);
    grid-template-columns: repeat(${props => props.width}, 2rem);
    grid-gap: 1px;
    border: 2px solid #333;
    width: fit-content;
    max-width: 25vw;
    background: #111;
`;
