import { Grid } from "@mui/material";
import React from "react";
import TimeElement from "./TimeElement";
import TimelineElement, { TimelineElementMetadata } from "./TimelineElement";
import { TimelineData } from "../../types";
import * as styles from './TimelineRow.module.scss'

export interface TimelineRowProps {
    spacing: number
    data: TimelineData[]
    meta: TimelineElementMetadata[]
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
                    data={item}
                    meta={props.meta[i]}
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
            <Grid item className={styles.gridItem}>
                <TimeElement time={time}/>
            </Grid>
            {items}
        </Grid>
    )
}