
const useDebounce = (callback: (...args: any) => any, delay: number = 2000) => {
    let timer: any;
    return (...args: any) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    }
}

export default useDebounce;
