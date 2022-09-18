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
import { getLoreString } from "../helpers";

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

  const imagePath = props.seasons[props.timelineData.seasonAdded].icon;

  const style = `.${styles.content}::after {
    content: url("https://github.com/Simply-Cods/destiny-timeline/tree/main/src/images/${imagePath}");
  }`

  const html = {
    __html: style
  }

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color="grey" />
        <TimelineConnector />
      </TimelineSeparator>
      <style dangerouslySetInnerHTML={html}/>
      <TimelineContent className={styles.content}>
        {props.timelineData.title !== "" && <h1>{props.timelineData.title}</h1>}
        {props.timelineData.subtitle !== "" && <p>{props.timelineData.subtitle}</p>}
      </TimelineContent>
    </TimelineItem>
  )
}