import React from "react";
import { 
TimelineItem,
TimelineSeparator,
TimelineDot,
TimelineConnector,
TimelineContent,
} from '@mui/lab'
import * as styles from './TimeElement.module.scss'
import clsx from "clsx";

export interface TimeElementProps {
    time: string;
}

export default function TimeElement(props: TimeElementProps) {
    return (
        <TimelineItem className={styles.element}>
            <TimelineSeparator>
                {props.time && <TimelineDot className={styles.dot}/>}
                <TimelineConnector className={clsx(!props.time && styles.connectorNoTime)}/>
            </TimelineSeparator>
            <TimelineContent className={styles.content}>
                <p className={styles.text}>{props.time}</p>
            </TimelineContent>
        </TimelineItem>
    )
}