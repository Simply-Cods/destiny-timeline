import React, { useContext, useState, useEffect } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import * as styles from "./Arrows.module.scss";

function Arrow({
    children,
    disabled,
    onClick,
}: {
    children: React.ReactNode;
    disabled: boolean;
    onClick: VoidFunction;
}) {
    return (
        <button
            className={styles.arrow}
            style={{
                opacity: disabled ? "0" : "1",
                cursor: disabled ? "default" : "pointer",
            }}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export function LeftArrow() {
    const {
        isFirstItemVisible,
        scrollPrev,
        visibleItemsWithoutSeparators,
        initComplete,
    } = useContext(VisibilityContext);

    const [disabled, setDisabled] = useState(
        !initComplete || (initComplete && isFirstItemVisible)
    );

    useEffect(() => {
        // only detect if whole component visible
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isFirstItemVisible);
        }
    }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

    return (
        <Arrow disabled={disabled} onClick={() => scrollPrev()}>
            <span className="material-icons">arrow_back</span>
        </Arrow>
    );
}

export function RightArrow() {
    const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
        useContext(VisibilityContext);

    const [disabled, setDisabled] = useState(
        !visibleItemsWithoutSeparators.length && isLastItemVisible
    );

    useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isLastItemVisible);
        }
    }, [isLastItemVisible, visibleItemsWithoutSeparators]);

    return (
        <Arrow disabled={disabled} onClick={() => scrollNext()}>
            <span className="material-icons">arrow_forward</span>
        </Arrow>
    );
}
