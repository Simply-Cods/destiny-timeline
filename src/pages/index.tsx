import React from "react"
import type { HeadFC } from "gatsby"
import timelineData from '../data/timelineData.json';
import seasons from '../data/seasons.json';
import timelines from '../data/timelinesDefinition.json'
import './index.scss'
import TimelineRenderer from "../components/timeline/TimelineRenderer";
import Header from "../components/Header";

const IndexPage = () => {
  return(
    <>
      <Header />
      <TimelineRenderer 
          seasons={seasons}
          timelineData={timelineData}
          timelines={timelines}
      />
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
