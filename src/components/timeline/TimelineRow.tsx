import { Grid } from "@mui/material";
import React from "react";
import TimeElement from "./TimeElement";
import TimelineElement from "./TimelineElement";
import { Season, TimelineData } from "./TimelineRenderer";
import * as styles from './TimelineRow.module.scss'

export interface TimelineRowProps {
    seasons: Season[]
    spacing: number
    data: TimelineData[]
}

export default function TimelineRow(props: TimelineRowProps) {

    let time = "";
    const items = props.data.map((item, i) => {
        if(!item){
            return <Grid item key={i}/>
        }
        if(item.time)
            time = item.time;

        return (
            <Grid item
                key={i}
                className={styles.gridItem}
            >
                <TimelineElement 
                    seasons={props.seasons}
                    timelineData={item}
                />
            </Grid>
            
        )
    })

    return (
        <Grid
            item container
            spacing={props.spacing}
            columns={props.data.length + 1}
        >
            <Grid item>
                <TimeElement time={time}/>
            </Grid>
            {items}
        </Grid>
    )
}