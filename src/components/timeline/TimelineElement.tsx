import React from "react";
import {
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab'
import * as styles from './TimelineElement.module.scss'
import { TimelineData, Season } from "./TimelineRenderer";
import { getLoreString } from "../../helpers";
import { SeasonIcon } from "../image-gen";

export interface TimelineElementProps {
    timelineData: TimelineData;
    seasons: Season[]
}

export default function TimelineElement(props: TimelineElementProps) {
  const sources = props.timelineData.sources.map((source, i) => {
    const book = getLoreString(source);
    return (
      <li key={i}>
        <a href={source}>{book}</a>
      </li>
    )
  });

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color="grey" />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <div>
          <>
            <SeasonIcon 
              season={props.timelineData.seasonAdded} 
              className={styles.season} 
            />
            {props.timelineData.title !== "" && <h1>{props.timelineData.title}</h1>}
            {props.timelineData.subtitle !== "" && <p>{props.timelineData.subtitle}</p>}
            <ul>
              {sources}
            </ul>
          </>
        </div>
      </TimelineContent>
    </TimelineItem>
  )
}