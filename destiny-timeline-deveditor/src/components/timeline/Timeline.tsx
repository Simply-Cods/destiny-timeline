import React, { useState } from 'react';
import Column from './Column';
import { TimelineDefinition } from '../../../../src/types'
import './Timeline.scss'

export default function Timeline() {
    const [data, setData] = useState<TimelineDefinition[]>([
        {
            contentDirection: "",
            debugName: "before",
            children: [
                {
                    time: "Before time itself",
                    title: "THE FLOWER GAME",
                    subtitle: "The Gardener and Winnower cycle the pattern",
                    seasonAdded: 16,
                    timelineIndex: 0,
                    indexOverride: -1,
                    style: "empty",
                    sources: [
                        "https://www.ishtar-collective.net/entries/the-flower-game#book-unveiling"
                    ]
                  },
                {
                  time: "Before time itself",
                  title: "THE FLOWER GAME",
                  subtitle: "The Gardener and Winnower cycle the pattern",
                  seasonAdded: 16,
                  timelineIndex: 0,
                  indexOverride: -1,
                  style: "major",
                  sources: [
                      "https://www.ishtar-collective.net/entries/the-flower-game#book-unveiling"
                  ]
                },
                {
                  time: "Before time itself",
                  title: "THE FLOWER GAME",
                  subtitle: "The Gardener and Winnower cycle the pattern",
                  seasonAdded: 16,
                  timelineIndex: 0,
                  indexOverride: -1,
                  style: "empty",
                  sources: [
                      "https://www.ishtar-collective.net/entries/the-flower-game#book-unveiling"
                  ]
                },
            ],
        },
        {
            contentDirection: "",
            debugName: "default",
            children: [
                {
                  time: "Before time itself",
                  title: "THE FLOWER GAME",
                  subtitle: "The Gardener and Winnower cycle the pattern",
                  seasonAdded: 16,
                  timelineIndex: 0,
                  indexOverride: -1,
                  style: "major",
                  sources: [
                      "https://www.ishtar-collective.net/entries/the-flower-game#book-unveiling"
                  ]
                },
                {
                  time: "Before time itself",
                  title: "THE FLOWER GAME",
                  subtitle: "The Gardener and Winnower cycle the pattern",
                  seasonAdded: 16,
                  timelineIndex: 0,
                  indexOverride: -1,
                  style: "major",
                  sources: [
                      "https://www.ishtar-collective.net/entries/the-flower-game#book-unveiling"
                  ]
                },
                {
                    time: "Before time itself",
                    title: "THE FLOWER GAME",
                    subtitle: "The Gardener and Winnower cycle the pattern",
                    seasonAdded: 16,
                    timelineIndex: 0,
                    indexOverride: -1,
                    style: "major",
                    sources: [
                        "https://www.ishtar-collective.net/entries/the-flower-game#book-unveiling"
                    ]
                },
            ],
        },
        {
            contentDirection: "",
            debugName: "after",
            children: [
                {
                    time: "Before time itself",
                    title: "THE FLOWER GAME",
                    subtitle: "The Gardener and Winnower cycle the pattern",
                    seasonAdded: 16,
                    timelineIndex: 0,
                    indexOverride: -1,
                    style: "empty",
                    sources: [
                        "https://www.ishtar-collective.net/entries/the-flower-game#book-unveiling"
                    ]
                  },
                {
                  time: "Before time itself",
                  title: "THE FLOWER GAME",
                  subtitle: "The Gardener and Winnower cycle the pattern",
                  seasonAdded: 16,
                  timelineIndex: 0,
                  indexOverride: -1,
                  style: "major",
                  sources: [
                      "https://www.ishtar-collective.net/entries/the-flower-game#book-unveiling"
                  ]
                },
                {
                  time: "Before time itself",
                  title: "THE FLOWER GAME",
                  subtitle: "The Gardener and Winnower cycle the pattern",
                  seasonAdded: 16,
                  timelineIndex: 0,
                  indexOverride: -1,
                  style: "major",
                  sources: [
                      "https://www.ishtar-collective.net/entries/the-flower-game#book-unveiling"
                  ]
                },
            ],
        }
    ])

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
        <div className='timeline--columns-container'>
            {rows}
        </div>            
    )
}