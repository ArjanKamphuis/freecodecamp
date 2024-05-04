import { useCallback, useEffect, useRef } from "react";

export function useEffectEvent<T extends Function>(event: T): T {
    const fn = useRef<T | null>(null);
    useEffect(() => {
        fn.current = event;
    }, [event]);
    return useCallback<(...args: unknown[]) => unknown>((...args) => {
        return fn.current?.call(null, ...args);
    }, []) as unknown as T;
}
