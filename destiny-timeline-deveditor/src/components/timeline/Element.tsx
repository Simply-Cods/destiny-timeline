import React from "react";
import { TimelineData, TimelineDefinition } from "../../../../src/types";
import { nameof } from "../../helpers";
import "./Element.scss";

export default function Element({
    timelineData,
    timelineIndex,
    elementIndex,
    setData,
    isOnDefault,
}: {
    timelineData: TimelineData;
    timelineIndex: number;
    elementIndex: number;
    setData: React.Dispatch<React.SetStateAction<TimelineDefinition[]>>;
    isOnDefault?: boolean;
}) {
    function handleChange(event: any) {
        setData((prevData) => {
            const newData = [...prevData];
            newData[timelineIndex].children[elementIndex] = {
                ...prevData[timelineIndex].children[elementIndex],
                [event.target.name]: event.target.value,
            };
            return newData;
        });
    }
    const isStylable =
        timelineData.style === "major" || timelineData.style === "minor";

    const hasTime = isOnDefault && isStylable;
    const hasTitle = timelineData.style === "major" && isStylable;
    const hasSubtitle = isStylable;
    const hasSeason = isStylable;

    return (
        <div className="timeline-element">
            <form>
                <label>Time:</label>
                <input
                    type="text"
                    value={timelineData.time}
                    disabled={!hasTime}
                    onChange={handleChange}
                    name={nameof<TimelineData>("time")}
                />
                <label>Title:</label>
                <input
                    type="text"
                    required={hasTitle}
                    value={timelineData.title}
                    disabled={!hasTitle}
                    onChange={handleChange}
                    name={nameof<TimelineData>("title")}
                />
                <label>Subtitle:</label>
                <textarea
                    required={hasSubtitle && timelineData.style === "minor"}
                    value={timelineData.subtitle}
                    disabled={!hasSubtitle}
                    onChange={handleChange}
                    name={nameof<TimelineData>("subtitle")}
                />
                <label>Season added:</label>
                <input
                    type="number"
                    value={timelineData.seasonAdded}
                    onChange={handleChange}
                    required={hasSeason}
                    disabled={!hasSeason}
                    name={nameof<TimelineData>("seasonAdded")}
                />
                <label>Style:</label>
                <select
                    value={timelineData.style}
                    onChange={handleChange}
                    name={nameof<TimelineData>("style")}
                >
                    <option value="major">Major</option>
                    <option value="minor">Minor</option>
                    <option value="empty">Empty</option>
                    <option value="filler">Filler</option>
                    <option value="fadeIn">Fade In</option>
                    <option value="fadeOut">Fade Out</option>
                </select>
            </form>
        </div>
    );
}
