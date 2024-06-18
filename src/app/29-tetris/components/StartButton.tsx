import { memo } from "react";

const StartButton = memo((): React.JSX.Element => {
    return (
        <div>Start Game</div>
    );
});

StartButton.displayName = 'StartButton';
export default StartButton;
