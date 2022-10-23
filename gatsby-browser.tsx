export const onClientEntry = () => {
    // support for background images in Safari and Internet Explorer
    if (!("IntersectionObserver" in window)) {
        import("intersection-observer");
        console.log("# IntersectionObserver is polyfilled!");
    }
};
