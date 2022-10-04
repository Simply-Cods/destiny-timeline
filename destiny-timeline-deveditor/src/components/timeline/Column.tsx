import React from "react";
import { TimelineDefinition } from "../../../../src/types";
import Element from "./Element";
import "./Column.scss";

export default function Column({
    data,
    timelineIndex,
    setData,
    isDefault,
}: {
    data: TimelineDefinition;
    timelineIndex: number;
    setData: React.Dispatch<React.SetStateAction<TimelineDefinition[]>>;
    isDefault?: boolean;
}) {
    const elements = data.children.map((element, i) => {
        return (
            <Element
                key={i}
                timelineIndex={timelineIndex}
                elementIndex={i}
                timelineData={element}
                setData={setData}
                isOnDefault={isDefault}
            />
        );
    });

    return (
        <div>
            <h1 className="column--name">{data.debugName}</h1>
            <div className="column--element-container">{elements}</div>
        </div>
    );
}
