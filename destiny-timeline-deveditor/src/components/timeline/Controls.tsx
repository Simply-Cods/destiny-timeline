import React from "react";
import {TimelineDefinition, TimelineData} from '../../../../src/types'

export default function Controls({
    setData,
}: {
    setData: React.Dispatch<React.SetStateAction<TimelineDefinition[]>>;
}) {
    const defaultElement: TimelineData = {
        time: "",
        title: "",
        subtitle: "",
        seasonAdded: 0,
        style: "empty",
        sources: [],
    } 

    function addRow() {
        setData(prev => {
            const newData = [...prev]
            for (let i = 0; i < newData.length; i++) {
                newData[i].children.push({...defaultElement})
            }
            return newData;
        })
    }

    function addColumn() {
        setData(prev => {
            const newData = [...prev]
            const childrenLength = newData[0].children.length;
            const children: TimelineData[] = []
            for(let i = 0; i < childrenLength; i++) {
                children.push({...defaultElement})
            }
            newData.push({
                contentDirection: "",
                debugName: "new timeline",
                children: children
            })
            return newData
        })
    }

    return (
        <div>
            <button
                onClick={addRow}
            >Add Row (timeline entry)</button>
            <button
                onClick={addColumn}
            >Add Column (timeline)</button>
        </div>
    )
}