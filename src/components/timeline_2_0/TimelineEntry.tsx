import React from "react";
import { TimelineEntry as TimelineEntryType } from "../../types";
import * as styles from "./TimelineEntry.module.scss";

export default function TimelineEntry({
    timelineEntry,
}: {
    timelineEntry: TimelineEntryType;
}) {
    return (
        <div className={styles.entry}>
            {timelineEntry.title && (
                <h1 className={styles.title}>{timelineEntry.title}</h1>
            )}
            {timelineEntry.description && <p>{timelineEntry.description}</p>}
            {timelineEntry.sources && (
                <ul className={styles.sources}>
                    {timelineEntry.sources.map((val, i) => {
                        return (
                            <li className={styles.source} key={i}>
                                <a href={val.link}>{val.displayName}</a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
