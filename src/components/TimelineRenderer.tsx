import React from "react";
import { Grid } from "@mui/material";
import TimelineRow from "./TimelineRow";

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
    indexOverride: number;
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

    const defaultTimeline = sortedTimelines.find(t => t.index === 0)!

    // copy timeline elements
    const elements = [...props.timelineData];

    const elementsByTimeline: {[timelineIndex: number]: {[elementIndex: number]: TimelineData}} = {}

    let maxIndex = 0;

    elementsByTimeline[0] = {}
    //populate default timeline
    for (let i = 0; i < elements.length; i++) {
        
        const element = elements[i];
        if(element.timelineIndex === 0) {
            elementsByTimeline[0][maxIndex] = element;
            elements.splice(i, 1);
            maxIndex++;
            i--;
        }
    }

    // populate additional timelines with index overrides
    for (let i = 0; i < sortedTimelines.length; i++) {
        const timeline = sortedTimelines[i];
        if(timeline === defaultTimeline) {
            continue;
        }
        elementsByTimeline[timeline.index] = {}
        let lastIndex = -1;
        for(let j = 0; j< elements.length; j++) {
            const element = elements[j];
            if(element.timelineIndex === timeline.index) {
                if(element.indexOverride === -1) {
                    lastIndex++;
                }
                else if(element.indexOverride <= lastIndex) { 
                    throw new Error(`indexOverride: ${element.indexOverride} <= lastIndex: ${lastIndex} on ${timeline.debugName}`);
                }
                else {
                    lastIndex = element.indexOverride;
                }
                elementsByTimeline[timeline.index][lastIndex] = element;
                elements.splice(j, 1);
                maxIndex = lastIndex > maxIndex ? lastIndex : maxIndex;
                j--;                
            }
        }
    }

    const rows: JSX.Element[] = [];

    for(let i = 0; i < maxIndex; i++) {
        const data: TimelineData[] = []
        for(const timeline in elementsByTimeline) {
            data.push(elementsByTimeline[timeline][i])
        }
        rows.push((
            <TimelineRow
                key={i} 
                data={data}
                seasons={props.seasons}
                spacing={2}
            />
        ))
    }    

    return (
        <Grid container>
            {rows}
        </Grid>
    )
}