import React from "react";
import { TimelineCard as TimelineCardType } from "../../types";
import TimelineEntry from "./TimelineEntry";
import * as styles from "./TimelineCard.module.scss";

export default function TimelineCard({
    timelineCard,
}: {
    timelineCard: TimelineCardType;
}) {
    return (
        <div className={styles.card}>
            {timelineCard.time && <h1>{timelineCard.time}</h1>}
            {timelineCard.timelineEntries.map((val, i) => {
                return <TimelineEntry timelineEntry={val} key={i} />;
            })}
        </div>
    );
}
