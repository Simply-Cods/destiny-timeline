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

export interface TimelineElementProps {
    timelineData: TimelineData;
    seasons: Season[]
}

export default function TimelineElement(props: TimelineElementProps) {
  const sources = props.timelineData.sources.map(source => {
    const bookLowercase = source.split('#')[1].replace('-', ' ')
    const book = bookLowercase.split(' ').map(str => str[0].toUpperCase() + str.substring(1)).join(' ');
    return (
      <li>
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
        {props.timelineData.title !== "" && <h1>{props.timelineData.title}</h1>}
        {props.timelineData.subtitle !== "" && <p>{props.timelineData.subtitle}</p>}
        <ul>
          {sources && sources}
        </ul>
      </TimelineContent>
    </TimelineItem>
  )
}