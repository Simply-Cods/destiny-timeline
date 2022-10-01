import React, { useState, useEffect } from 'react';
import Column from './Column';
import { TimelineDefinition } from '../../../../src/types'
import './TimelineEditor.scss'
import Controls from './Controls';

export default function Timeline() {
    const [data, setData] = useState<TimelineDefinition[]>([])

    useEffect(() => {
        fetch('http://localhost:4001/timelines')
        .then(body => body.json())
        .then(data => {
            console.log(data)
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
            <Controls setData={setData}/>
            <div className='timeline-editor--columns-container'>
                {rows}
            </div>  
        </div>
                  
    )
}