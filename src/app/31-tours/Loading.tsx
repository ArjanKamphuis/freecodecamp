import { memo } from "react";

const Loading = memo((): React.JSX.Element => (
    <h2 className="text-4xl font-bold text-center">Loading...</h2>
));

Loading.displayName = 'Loading';
export default Loading;
