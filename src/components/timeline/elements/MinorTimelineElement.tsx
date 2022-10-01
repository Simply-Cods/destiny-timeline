import React from "react";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab'
import { TimelineData } from "../../../types";
import { getLoreString } from "../../../helpers";
import SeasonIcon from "../../image-gen/SeasonIcon";
import * as styles from './MinorTimelineElement..module.scss'
import clsx from "clsx";
import { TimelineElementMetadata } from "../TimelineElement"; 

export default function MinorTimelineElement({data, meta}: {data: TimelineData; meta: TimelineElementMetadata}) {
  const sources = data.sources.map((source, i) => {
    const book = getLoreString(source);
    return (
      <li key={i}>
        <a href={source}>{book}</a>
      </li>
    )
  });

  if(data.subtitle === "") {
    throw new Error("Subtitle must be present " + JSON.stringify(data))
  }

  return (
    <TimelineItem className={styles.timelineElement}>
      <TimelineSeparator>
        <TimelineDot color="grey" className={styles.dot}/>
        <TimelineConnector className={clsx(meta.nextMajor ? styles.connector : styles.connectorNextMajor)}/>
      </TimelineSeparator>
      <TimelineContent className={styles.timelineContent}>
        <div>
            <p className={styles.subtitle}>
                {data.subtitle}
                <SeasonIcon 
                    season={data.seasonAdded} 
                    as={"span"}
                    className={styles.seasonIcon}
                />
            </p>
            <ul>
              {sources}
            </ul>
        </div>
      </TimelineContent>
    </TimelineItem>
  )
}