import React from "react";
import * as styles from './TimelineElement.module.scss'
import { TimelineData } from "./TimelineRenderer";
import MajorTimelineElement from "./elements/MajorTimelineElement";
import MinorTimelineElement from "./elements/MinorTimelineElement";

export interface TimelineElementMetadata {
  nextMajor: boolean;
}

export default function TimelineElement({data, meta}: {data: TimelineData; meta:TimelineElementMetadata}) {

  let element: JSX.Element

  switch(data.style) {
    case "major": 
      element = <MajorTimelineElement data={data} meta={meta} />
      break;
    case 'minor':
      element = <MinorTimelineElement data={data} meta={meta}/>
      break;
  }

  return element
}