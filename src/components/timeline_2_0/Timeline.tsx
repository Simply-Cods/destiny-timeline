import React, { useRef, useEffect, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { usePreventBodyScroll } from "../../helpers";
import { TimelineCard } from "../../types";
import TimelineCardElement from "./TimelineCard";
import * as styles from "./Timeline.module.scss";
import "./hideScrollbar.scss";
import { LeftArrow, RightArrow } from "./Arrows";

export default function Timeline({
    timelineCards,
    setScrollPercent,
}: {
    timelineCards: TimelineCard[];
    setScrollPercent: React.Dispatch<React.SetStateAction<number>>;
}) {
    type ScrollVisibilityApi = React.ContextType<typeof VisibilityContext>;

    function onWheel(api: ScrollVisibilityApi, ev: React.WheelEvent) {
        const isTouchpad =
            Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

        if (isTouchpad) {
            ev.stopPropagation();
            return;
        }

        if (ev.deltaY > 0) {
            api.scrollNext();
        } else if (ev.deltaY < 0) {
            api.scrollPrev();
        }
    }

    const apiRef = useRef({} as ScrollVisibilityApi);
    const [visible, setVisible] = useState<boolean[]>(
        Array.apply(null, Array(timelineCards.length)).map(() => false)
    );

    function onVisible(id: number) {
        setVisible((old) => {
            const newVal = [...old];
            newVal[id] = true;
            return newVal;
        });
    }

    function onInvisible(id: number) {
        setVisible((old) => {
            const newVal = [...old];
            newVal[id] = false;
            return newVal;
        });
    }

    // useEffect(() => {
    //     const api = apiRef.current;

    //     setScrollPercent((old) => {
    //         let scrollPercent = old;

    //         if(api.isLastItemVisible) {
    //             scrollPercent = 100;
    //         } else if (api.isFirstItemVisible) {
    //             scrollPercent = 0;
    //         } else if(api.visibleItemsWithoutSeparators.length > 0){
    //             const item = api.visibleItemsWithoutSeparators[0];
    //             const itemsArr = api.items.toItemsWithoutSeparators()
    //             const index = itemsArr.findIndex((element) => element === item)
    //             scrollPercent = (index / itemsArr.length) * 100
    //         }

    //         return scrollPercent;
    //     })

    // }, [apiRef.current.visibleItemsWithoutSeparators])
    useEffect(() => {
        setScrollPercent((old) => {
            let scrollPercent = old;

            if (visible[visible.length - 1]) {
                scrollPercent = 100;
            } else if (visible[0]) {
                scrollPercent = 0;
            } else {
                const firstVisibleIndex = visible.findIndex(
                    (val) => val === true
                );
                if (firstVisibleIndex >= 0)
                    scrollPercent = (firstVisibleIndex / visible.length) * 100;
            }

            return scrollPercent;
        });
    });

    const { disableScroll, enableScroll } = usePreventBodyScroll();

    return (
        <div
            onMouseEnter={disableScroll}
            onMouseLeave={enableScroll}
            className={styles.timeline}
        >
            <ScrollMenu
                apiRef={apiRef}
                onWheel={onWheel}
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
                separatorClassName={styles.seperator}
            >
                {timelineCards.map((val, i) => {
                    return (
                        <TimelineCardElement
                            timelineCard={val}
                            key={i}
                            itemId={i}
                            onVisible={onVisible}
                            onInvisible={onInvisible}
                        />
                    );
                })}
            </ScrollMenu>
        </div>
    );
}
