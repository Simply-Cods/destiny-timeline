import React from "react";
import * as styles from "./TimelineElement.module.scss";
import { TimelineData } from "../../types";
import MajorTimelineElement from "./elements/MajorTimelineElement";
import MinorTimelineElement from "./elements/MinorTimelineElement";
import FillerTimelineElement from "./elements/FillerTimelineElement";
import EmptyTimelineElement from "./elements/EmptyTimelineElement";

export interface TimelineElementMetadata {
    nextMajor: boolean;
}

export default function TimelineElement({
    data,
    meta,
}: {
    data: TimelineData;
    meta: TimelineElementMetadata;
}) {
    let element: JSX.Element;

    switch (data.style) {
        case "major":
            element = <MajorTimelineElement data={data} meta={meta} />;
            break;
        case "minor":
            element = <MinorTimelineElement data={data} meta={meta} />;
            break;
        case "empty":
            element = <EmptyTimelineElement meta={meta} />;
            break;
        case "filler":
            element = <FillerTimelineElement />;
    }

    return element;
}
