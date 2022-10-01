import React, { useState } from 'react';
import Column from './Column';
import { TimelineDefinition } from '../../../../src/types'
import './TimelineEditor.scss'
import Controls from './Controls';

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
        <div>
            <Controls setData={setData}/>
            <div className='timeline-editor--columns-container'>
                {rows}
            </div>  
        </div>
                  
    )
}