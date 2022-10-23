import React, { useContext, useEffect } from "react";
import { TimelineCard as TimelineCardType } from "../../types";
import TimelineEntry from "./TimelineEntry";
import * as styles from "./TimelineCard.module.scss";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

export default function TimelineCard({
    timelineCard,
    itemId,
    onVisible,
    onInvisible,
}: {
    timelineCard: TimelineCardType;
    itemId: number; // used to check for visibility changes
    onVisible: (id: number) => void;
    onInvisible: (id: number) => void;
}) {
    const { isItemVisible } = useContext(VisibilityContext);

    const isVisible = isItemVisible(itemId.toString());

    useEffect(() => {
        isVisible ? onVisible(itemId) : onInvisible(itemId);
    }, [isVisible]);

    return (
        <div className={styles.card}>
            <h1 className={styles.time}>{timelineCard.time}</h1>
            {timelineCard.timelineEntries.map((val, i) => {
                return <TimelineEntry timelineEntry={val} key={i} />;
            })}
        </div>
    );
}
