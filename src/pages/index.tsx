import React from "react";
import type { HeadFC } from "gatsby";
import timelineDataImport from "../data/timelineData.json";
import "./index.scss";
import TimelineRenderer from "../components/timeline/TimelineRenderer";
import Header from "../components/Header";
import { TimelineDefinition } from "../types";

const IndexPage = () => {
    const timelineData = timelineDataImport as TimelineDefinition[];
    return (
        <>
            <Header />
            <TimelineRenderer
                timelines={timelineData}
                columnSpacing={2}
                rowSpacing={2}
            />
        </>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
