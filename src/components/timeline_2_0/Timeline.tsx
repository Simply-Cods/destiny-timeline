import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { usePreventBodyScroll } from "../../helpers";
import { TimelineCard } from "../../types";
import TimelineCardElement from "./TimelineCard";
import * as styles from "./Timeline.module.scss";
import "./hideScrollbar.scss";
import { LeftArrow, RightArrow } from "./Arrows";

export default function Timeline({
    timelineCards,
}: {
    timelineCards: TimelineCard[];
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

    const { disableScroll, enableScroll } = usePreventBodyScroll();

    return (
        <div
            onMouseEnter={disableScroll}
            onMouseLeave={enableScroll}
            className={styles.timeline}
        >
            <ScrollMenu
                onWheel={onWheel}
                LeftArrow={LeftArrow}
                RightArrow={RightArrow}
            >
                {timelineCards.map((val, i) => {
                    return <TimelineCardElement timelineCard={val} key={i} />;
                })}
            </ScrollMenu>
        </div>
    );
}
