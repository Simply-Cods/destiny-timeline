import React from "react";
import {
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
} from "@mui/lab";
import * as styles from "./EmptyTimelineElement.module.scss";
import { TimelineElementMetadata } from "../TimelineElement";
import clsx from "clsx";

export default function EmptyTimelineElement({
    meta,
}: {
    meta: TimelineElementMetadata;
}) {
    return (
        <TimelineItem className={styles.timelineElement}>
            <TimelineSeparator>
                <TimelineConnector
                    className={clsx(
                        meta.nextMajor
                            ? styles.connector
                            : styles.connectorNextMajor
                    )}
                />
            </TimelineSeparator>
            <TimelineContent
                className={styles.timelineContent}
            ></TimelineContent>
        </TimelineItem>
    );
}
