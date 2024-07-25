import { memo, useEffect, useState } from "react";
import { useCopyToClipboard, useEventCallback } from "usehooks-ts";

type SingleColorProps = {
    hex: string;
    weight: number;
    type: string;
};

const SingleColor = memo(({ hex, weight, type }: SingleColorProps) => {
    const [alert, setAlert] = useState<boolean>(false);
    const [, copyToClipboard] = useCopyToClipboard();

    useEffect(() => {
        const timeoutId: NodeJS.Timeout = setTimeout(() => setAlert(false), 3000);
        return () => clearTimeout(timeoutId);
    }, [alert]);
    
    const handleCopyClick = useEventCallback(async () => {
        try {
            await copyToClipboard(hex);
            setAlert(true);
        } catch (ex: any) {
            console.error(ex);
        }
    });

    return (
        <article onClick={handleCopyClick} className={`w-36 h-36 flex flex-col p-5 cursor-pointer text-sm${type === 'shade' ? ' text-white' : ''}`} style={{ backgroundColor: hex }}>
            <p>{weight}%</p>
            <p>{hex}</p>
            {alert && <p className="mt-2 uppercase tracking-widest text-xs">Copied to Clipboard</p>}
        </article>
    );
});

SingleColor.displayName = 'SingleColor';
export default SingleColor;
