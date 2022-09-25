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
import SeasonIcon from "../image-gen/SeasonIcon";
import { Grid } from "@mui/material";


//import { SeasonIcon } from "../image-gen";

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
    <TimelineItem className={styles.element}>
      <TimelineSeparator>
        <TimelineDot color="grey"/>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent className={styles.timelineContent}>
        <div className={styles.timelineContentWrapper}>
          <>
          <div>
            {/* <SeasonIcon 
              season={props.timelineData.seasonAdded} 
              className={styles.season} 
              as={"span"}
            /> */}
            {props.timelineData.title !== "" && <h1 className={styles.title}>
              {props.timelineData.title}
              <SeasonIcon 
                season={props.timelineData.seasonAdded} 
                className={styles.season} 
                as={"span"}
              />
            </h1>}
          </div>
            {props.timelineData.subtitle !== "" && <p className={styles.subtitle}>{props.timelineData.subtitle}</p>}
            <ul>
              {sources}
            </ul>
          </>
        </div>
      </TimelineContent>
    </TimelineItem>
  )
}