import React from "react";
import { Grid } from "@mui/material";
import TimelineRow from "./TimelineRow";
import * as styles from "./TimelineRenderer.module.scss";
import { TimelineElementMetadata } from "./TimelineElement";
import { TimelineData, TimelineDefinition } from "../../types";

export interface TimelineRendererProps {
    timelineData: TimelineData[];
}

export default function TimelineRenderer({
    timelines,
    rowSpacing,
    columnSpacing,
}: {
    timelines: TimelineDefinition[];
    rowSpacing: number;
    columnSpacing: number;
}) {
    const metadataByTimeline: TimelineElementMetadata[][] = [];
    const defaultMetadata: TimelineElementMetadata = {
        nextMajor: false,
    };

    // calculate metadata
    // i - timeline
    // j - timeline children
    for (let i = 0; i < timelines.length; i++) {
        const timeline = timelines[i];
        metadataByTimeline.push([]);
        for (let j = 0; j < timeline.children.length; j++) {
            metadataByTimeline[i][j] = { ...defaultMetadata };

            if (j + 1 < timelines.length) {
                const next = timeline.children[j + 1];

                if (next.style === "major")
                    metadataByTimeline[i][j].nextMajor = true;
            }
        }
    }

    // if(process.env.NODE_ENV === "development") {
    //     const debugData: any[] = []

    //     for(let i = 0; i < timelines.length; i++) {
    //         debugData.push({})
    //         for(let j = 0; j < timelines[i].children.length; j++) {
    //             const timelineData = timelines[i].children[j];
    //             const metadata = metadataByTimeline[i][j];

    //             const data = `${timelineData.style} ${metadata.nextMajor}`
    //             debugData[i] = {...debugData[i], [j]: data}
    //         }
    //     }

    //     console.table(debugData)
    // }

    const rows: JSX.Element[] = [];

    // generate row elements
    // i - row
    // j - column (timeline)
    for (let i = 0; i < timelines[0].children.length; i++) {
        const rowData: TimelineData[] = [];
        const rowMetadata: TimelineElementMetadata[] = [];
        for (let j = 0; j < timelines.length; j++) {
            const data = timelines[j].children[i];
            rowData.push(data);

            const metadata = metadataByTimeline[j][i];
            rowMetadata.push(metadata);
        }

        rows.push(
            <TimelineRow
                key={i}
                data={rowData}
                meta={rowMetadata}
                spacing={columnSpacing}
            />
        );
    }

    return (
        <Grid container className={styles.container} spacing={rowSpacing}>
            {rows}
        </Grid>
    );
}
