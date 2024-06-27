import styled from "styled-components";
import { TetrominoType } from "../../tetrominos";

export const StyledCell = styled.div<{ color: string, content: TetrominoType }>`
    width: auto;
    background: rgba(${props => props.color}, 0.8);
    border: ${props => props.content === 0 ? '0' : '4px solid'};
    border-bottom-color: rgba(${props => props.color}, 0.1);
    border-right-color: rgba(${props => props.color}, 1);
    border-top-color: rgba(${props => props.color}, 1);
    border-left-color: rgba(${props => props.color}, 0.3);
`;
