import {useEffect, useRef} from "react";

export const useObserver = (ref, canLoad, isLoading,  cb) => {
    const observer = useRef();
    useEffect(() => {
        if (isLoading) return; // does not create a new observer when isLoading=true
        if(observer.current) observer.current.disconnect();
        const options = {
            root: document
        };
        const callback = function (entries, observer) {
            if (entries[0].isIntersecting && canLoad) {
                cb();
            }
        };
        observer.current = new IntersectionObserver(callback, options);
        observer.current.observe(ref.current);
    }, [isLoading]);
}