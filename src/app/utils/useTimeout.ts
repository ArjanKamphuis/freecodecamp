import { useEffect } from "react";
import { useEffectEvent } from "./useEffectEvent";

export function useTimeout(callback: () => void, ms?: number): void {
    const onTick = useEffectEvent(callback);
    useEffect(() => {
        const id: NodeJS.Timeout = setTimeout(onTick, ms);
        return (): void => { clearTimeout(id); };
    }, [ms, onTick]);
}
