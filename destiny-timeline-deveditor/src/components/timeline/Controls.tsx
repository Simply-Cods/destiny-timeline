import React from "react";
import {TimelineDefinition, TimelineData} from '../../../../src/types'

export default function Controls({
    setData,
    data,
}: {
    setData: React.Dispatch<React.SetStateAction<TimelineDefinition[]>>;
    data: TimelineDefinition[];
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
            console.log(newData)
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

    function save() {
        fetch("http://localhost:4001/timelines", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(res => {
            if(res.ok) {
                window.alert("Success");
            } else {
                window.alert(res.status);
            }
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
            <button
                onClick={save}
            >Save</button>
        </div>
    )
}