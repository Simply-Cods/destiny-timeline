import React from "react";
import TimelineElement from "./TimelineElement";
import { Season, TimelineData, TimelineDefinition } from "./TimelineRenderer";
import MUI_Timeline from '@mui/lab/Timeline'

export interface TimelineProps {
    timelineDefinition: TimelineDefinition
    timelineData: TimelineData[];
    seasons: Season[];
}

export default function Timeline(props: TimelineProps) {
    console.groupCollapsed('[Timeline.tsx]' ,props.timelineDefinition.debugName);
    console.log(props.timelineData);
    console.groupEnd();
    const timelineElements = props.timelineData.map((element, i) => {
        return (
            <TimelineElement 
                key={i}
                timelineData={element}
                seasons={props.seasons}
            />
        )
    })

    const timelinePosition = props.timelineDefinition.contentDirection as 'alternate' | 'left' | 'right'

    return (
        <MUI_Timeline
            position={timelinePosition ? timelinePosition : 'alternate'}
        >
            {timelineElements}
        </MUI_Timeline>
    )
}