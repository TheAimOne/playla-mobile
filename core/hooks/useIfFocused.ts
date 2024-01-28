import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";

const useIfFocused = (callbackFn: (...args: any) => any, dependencyList: any[] = []) => {
    const isFocused = useIsFocused()
    
    useEffect(() => {
        if (isFocused) {
            callbackFn()
        }
    }, [isFocused, ...dependencyList])
}

export { useIfFocused };
