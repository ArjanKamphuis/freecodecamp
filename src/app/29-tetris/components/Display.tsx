import { memo } from "react";

type DisplayProps = {
    text: string;
};

const Display = memo(({ text }: DisplayProps): React.JSX.Element => {
    return (
        <div>{text}</div>
    );
});

Display.displayName = 'Display';
export default Display;
