import React from "react";
import {VerticalTimelineElement} from 'react-vertical-timeline-component'
import * as styles from './TimelineElement.module.scss'
import clsx from 'clsx';

export interface TimelineElementProps {
    time: string,
    title: string,
    subtitle: string,
    seasonAdded: number,
    sources: string[],
}

export default function TimelineElement(props: TimelineElementProps){
    const sources = props.sources.map(source => {
        const bookLowercase = source.split('#')[1].replace('-', ' ')
        const book = bookLowercase.split(' ').map(str => str[0].toUpperCase() + str.substring(1)).join(' ');
        return (
          <li>
            <a href={source}>{book}</a>
          </li>
        )
      });

    return (
        <VerticalTimelineElement
            date={props.time}
            iconClassName={props.title === "" ? styles.iconMinor : styles.iconMajor}
            
        >
            {props.title !== "" && <h1>{props.title}</h1>}
            {props.subtitle !== "" && <p>{props.subtitle}</p>}
            {sources && sources}
        </VerticalTimelineElement>
    )
}