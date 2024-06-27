import { MouseEvent, memo } from "react";
import { StyledStartButton } from "./styles/StyledStartButton";

type StartButtonprops = {
    onClick: () => void;
};

const StartButton = memo(({ onClick }: StartButtonprops): React.JSX.Element => (
    <StyledStartButton onClick={onClick}>Start Game</StyledStartButton>
));

StartButton.displayName = 'StartButton';
export default StartButton;
