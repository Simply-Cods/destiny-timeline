import React, { useState, useEffect } from "react";
import type { HeadFC } from "gatsby";
import timelineDataImport from "../data/timelineData.json";
import "./index.scss";
import TimelineRenderer from "../components/timeline/TimelineRenderer";
import Header from "../components/Header";
import { TimelineCard, TimelineDefinition } from "../types";
import Timeline from "../components/timeline_2_0/Timeline";
import { graphql, useStaticQuery } from "gatsby";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import { convertToBgImage } from "gbimage-bridge";
import BackgroundImage from "gatsby-background-image";

const IndexPage = () => {
    const timelineData = timelineDataImport as TimelineCard[];

    const { file } = useStaticQuery(
        graphql`
            query {
                file(relativePath: { eq: "bg.jpg" }) {
                    childImageSharp {
                        gatsbyImageData(
                            placeholder: BLURRED
                            formats: [AUTO, WEBP, AVIF]
                        )
                    }
                }
            }
        `
    );
    const image = getImage(file);

    const bgImage = convertToBgImage(image);

    const [scrollPercent, setScrollPercent] = useState(0);

    return (
        <BackgroundImage
            Tag="section"
            {...bgImage}
            preserveStackingContext
            id="paralax-background"
            style={{
                backgroundPosition: `50% ${scrollPercent}%`,
                // transition: "background-position 500ms ease-in",
            }}
        >
            <Header />
            {/* <TimelineRenderer
                timelines={timelineData}
                columnSpacing={2}
                rowSpacing={2}
            /> */}
            <Timeline
                timelineCards={timelineData}
                setScrollPercent={setScrollPercent}
            />
        </BackgroundImage>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
