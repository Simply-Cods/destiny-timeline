import React from "react";
import {
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
} from "@mui/lab";
import { TimelineData } from "../../../types";
import { getLoreString } from "../../../helpers";
import SeasonIcon from "../../image-gen/SeasonIcon";
import * as styles from "./MajorTimelineElement.module.scss";
import clsx from "clsx";
import { TimelineElementMetadata } from "../TimelineElement";

export default function MajorTimelineElement({
    data,
    meta,
}: {
    data: TimelineData;
    meta: TimelineElementMetadata;
}) {
    const sources = data.sources.map((source, i) => {
        const book = getLoreString(source);
        return (
            <li key={i}>
                <a href={source}>{book}</a>
            </li>
        );
    });

    if (data.title === "") {
        throw new Error("Title must be present " + JSON.stringify(data));
    }

    return (
        <TimelineItem className={styles.timelineElement}>
            <TimelineSeparator>
                <TimelineDot color="grey" />
                <TimelineConnector
                    className={clsx(
                        meta.nextMajor
                            ? styles.connector
                            : styles.connectorNextMajor
                    )}
                />
            </TimelineSeparator>
            <TimelineContent className={styles.timelineContent}>
                <div>
                    <>
                        <div className={styles.titleContainer}>
                            <h1 className={styles.title}>
                                {data.title}
                                <SeasonIcon
                                    season={data.seasonAdded}
                                    className={styles.seasonIcon}
                                    as={"span"}
                                />
                            </h1>
                        </div>
                        {data.subtitle !== "" && <p>{data.subtitle}</p>}
                        <ul>{sources}</ul>
                    </>
                </div>
            </TimelineContent>
        </TimelineItem>
    );
}
