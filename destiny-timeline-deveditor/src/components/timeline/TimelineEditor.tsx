import React, { useState, useEffect } from 'react';
import Column from './Column';
import { TimelineDefinition } from '../../../../src/types'
import './TimelineEditor.scss'
import Controls from './Controls';

export default function Timeline() {
    const [data, setData] = useState<TimelineDefinition[]>([])

    useEffect(() => {
        fetch('http://localhost:4001/timelines', {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
        .then(body => body.json())
        .then(data => {
            setData(data)
        })
    }, [])

    const rows = data.map((column, i) => {
        return <Column 
            key={i}
            data={column}
            timelineIndex={i}
            setData={setData}
            isDefault={column.debugName === "default"}
        />
    })

    return (
        <div>
            <Controls setData={setData} data={data} />
            <div className='timeline-editor--columns-container'>
                {rows}
            </div>  
        </div>
                  
    )
}