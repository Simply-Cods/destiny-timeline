import React from "react";
import type { HeadFC } from "gatsby";
import timelineDataImport from "../data/timelineData.json";
import "./index.scss";
import TimelineRenderer from "../components/timeline/TimelineRenderer";
import Header from "../components/Header";
import { TimelineCard, TimelineDefinition } from "../types";
import Timeline from "../components/timeline_2_0/Timeline";

const IndexPage = () => {
    const timelineData = timelineDataImport as TimelineCard[];
    return (
        <>
            <Header />
            {/* <TimelineRenderer
                timelines={timelineData}
                columnSpacing={2}
                rowSpacing={2}
            /> */}
            <Timeline timelineCards={timelineData} />
        </>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
