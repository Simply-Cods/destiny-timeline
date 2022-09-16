import React from "react";
import Timeline from "./Timeline";
import { Grid } from "@mui/material";
import { logCollapsed } from '../helpers'

export interface TimelineRendererProps {
    timelineData: TimelineData[];
    timelines: TimelineDefinition[];
    seasons: Season[];
}

export interface TimelineData {
    time: string;
    title: string;
    subtitle: string;
    seasonAdded: number;
    timelineIndex: number;
    sources: string[];
}

export interface TimelineDefinition {
    debugName: string;
    index: number;
    contentDirection: string;
}

export interface Season {
    number: number;
    title: string;
    icon: string;
}

export default function TimelineRenderer(props: TimelineRendererProps) {
    // copy the timelines to avoid side effects
    let sortedTimelines = [...props.timelines]

    if(sortedTimelines.length > 1) {
        sortedTimelines = sortedTimelines.sort((a, b) => a.index - b.index);
    }

    logCollapsed('TimelineRenderer.tsx', 'Timelines', sortedTimelines)

    // copy timeline elements
    const elements = [...props.timelineData];

    const elementsByTimeline: {[key: number]: TimelineData[]} = {}

    // populate dictionary - magic?
    for (let i = 0; i < sortedTimelines.length; i++) {
        const timeline = sortedTimelines[i];
        elementsByTimeline[timeline.index] = [];
        const timelineElements = elementsByTimeline[timeline.index]
        for (let j = 0; j < elements.length; j++) {
            const element = elements[j];
            if (element.timelineIndex === timeline.index) {
                timelineElements.push(element);
                elements.splice(i, 1);
                // because we delete 1 item from the array we must decrement the index
                // otherwise we we will skip the next item
                j--; 
            }
        }
    }

    const timelines = sortedTimelines.map(timeline => {
        return (
            <Grid
                item
                key={timeline.index}
            >
                <Timeline
                    timelineDefinition={timeline}
                    timelineData={elementsByTimeline[timeline.index]}
                    seasons={props.seasons}
                />
            </Grid>
        )
    })

    return (
        <Grid 
            container 
            columns={timelines.length}
            columnSpacing={2}
        >
            {timelines}
        </Grid>
    );
}