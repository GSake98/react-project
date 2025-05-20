/* eslint-disable */
import { useEffect } from 'react';

const Platform = () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isWeb = typeof window !== 'undefined';

    // Run On-App init
    useEffect(() => {
        if (isMobile) {
            console.log("Running on mobile browser");
        } else if (isWeb) {
            console.log("Running on desktop browser");
        } else {
            console.log("Not running in a browser");
        }
    }, []);
};

export default Platform;
