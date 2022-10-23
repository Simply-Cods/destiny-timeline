import { useState, useEffect, useCallback, useDebugValue } from "react";

export function getLoreString(url: string) {
    const ishtar = "https://www.ishtar-collective.net/entries/";
    const entry = url.substring(ishtar.length);
    const str = entry.split("#");

    let book = "";
    // this is a book entry
    if (str.length > 1) {
        const bookWords = str[1].split("-");
        if (bookWords[0] === "book") {
            bookWords.splice(0, 1);
        }
        book = capitalizeStringArr(bookWords);
    }
    const entryWords = str[0].split("-");
    const entryString = capitalizeStringArr(entryWords);

    if (book) {
        return `${book}: ${entryString}`;
    }
    return entryString;
}

function capitalizeStringArr(str: string[]) {
    const capitalizedArr = str.map((s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
    });

    return capitalizedArr.join(" ");
}

function preventDefault(ev: Event) {
    if (ev.preventDefault) {
        ev.preventDefault();
    }
    ev.returnValue = false;
}

function enableBodyScroll() {
    document && document.removeEventListener("wheel", preventDefault, false);
}

function disableBodyScroll() {
    document &&
        document.addEventListener("wheel", preventDefault, {
            passive: false,
        });
}

export function usePreventBodyScroll() {
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        hidden ? disableBodyScroll() : enableBodyScroll();

        // cleanup function
        return enableBodyScroll;
    }, [hidden]);

    const disableScroll = useCallback(() => setHidden(true), []);
    const enableScroll = useCallback(() => setHidden(false), []);

    useDebugValue(hidden);

    return { disableScroll, enableScroll };
}
