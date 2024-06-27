import { memo } from "react";
import { StyledDisplay } from "./styles/StyledDisplay";

type DisplayProps = {
    gameOver?: boolean;
    text: string;
};

const Display = memo(({ gameOver, text }: DisplayProps): React.JSX.Element => (
    <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
));

Display.displayName = 'Display';
export default Display;
